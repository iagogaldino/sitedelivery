import { ServiceappService } from 'src/app/service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avals',
  templateUrl: './avals.component.html',
  styleUrls: ['./avals.component.css']
})
export class AvalsComponent implements OnInit {
  itens: Array<any> = [];
  constructor(private crud: CrudService, private service: ServiceappService) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    this.crud.get_api('consulta_avaliacoes_usu&id_usuario=' + this.service.getDadosUsuario().id).subscribe( data => {
      this.itens = data.obj;
    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );
  }

}
