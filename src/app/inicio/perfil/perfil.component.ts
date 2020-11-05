import { ServiceappService } from './../../service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private crud: CrudService, public service: ServiceappService) { }

  ngOnInit(): void {

  setTimeout (() => {

    this.crud.get_api('empresas-especifica&ident=' + this.service.getIdEmpresa()).subscribe(data => {
      console.log(data);
      if (data.erro) { alert('Erro ao tentar carregar configurações da loja'); return; }
      this.service.setDadosEmpresa(data.empresas[0]);
   });

  }, 800);

  }

}
