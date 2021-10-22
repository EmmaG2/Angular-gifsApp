import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'nYoYoiO5XtA97gj2CwpJb1LPzlXdMKhe';
  private _historial: string[] = [];

  public resultados: Array<Gif> = [];

  get historial () {
    return [...this._historial];
  };

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if ( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // };

  };

  buscarGifs ( query: string = '' ) {

    query = query.trim().toLowerCase();
    
    if ( !this._historial.includes( query ) ) {
      this._historial.unshift(query); 
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=nYoYoiO5XtA97gj2CwpJb1LPzlXdMKhe&q=${query}&limit=10`)
      .subscribe(( resp:SearchGifsResponse ) => {
        console.log(resp.data);
        this.resultados = resp.data
        resp.data[0].images.downsized_large.url
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
      
      

  };

};
