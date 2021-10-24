import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    :string = 'nYoYoiO5XtA97gj2CwpJb1LPzlXdMKhe';
  private urlService:string = 'https://api.giphy.com/v1/gifs';
  private _historial:string[] = [];

  public resultados: Array<Gif> = [];

  get historial () {
    return [...this._historial];
  };

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  };

  buscarGifs ( query: string = '' ) {

    query = query.trim().toLowerCase();
    
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift(query); 
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.urlService }/search`, { params } )
      .subscribe(( resp:SearchGifsResponse ) => {
        this.resultados = resp.data
        resp.data[0].images.downsized_large.url
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  };

};
