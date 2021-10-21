import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {


  get historial():Array<string> {
    return this.gifsService.historial;
  }

  constructor( private gifsService:GifsService ) {}
}
