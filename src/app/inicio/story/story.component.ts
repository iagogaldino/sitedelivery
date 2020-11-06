import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(public service: ServiceappService, private crud: CrudService) {

    this.crud.pegaHost().subscribe( data => {
      console.log(data[0].host);
      this.service.setHost(data[0].host, data[0].api);
     }, error => { alert('Erro ao carregar o host'); } );

   }

  ngOnInit(): void {

  }

}
