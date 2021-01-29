import { ServiceappService } from './../../service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {

  itens = [{ status: false, nome: '', nota: '', resposta: '', texto: ''}, { status: false }, { status: false }, { status: false }];
  statusLoader = false;
  constructor(private crud: CrudService, public service: ServiceappService) { }

  ngOnInit(): void {
    const a = setInterval(data => {
      console.log('consulta avaliações~~');
      if (this.service.getDadosEmpresa().id) {
        this.consulta();
        clearInterval(a);
      }
    }, 1500);

  }

  consulta() {
    this.crud.get_api('consulta_avaliacoes&id_empresa=' + this.service.getDadosEmpresa().id).subscribe(data => {
      this.itens = data.obj;
      this.statusLoader = true;
    }, error => { this.service.mostrarMensagem('Ocorreu um erro inesperado'); });
  }

  counter(i: number) {
    return new Array(i);
  }

}
