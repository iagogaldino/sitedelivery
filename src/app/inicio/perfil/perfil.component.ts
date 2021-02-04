import { ActivatedRoute } from '@angular/router';
import { SelectAddressComponent } from './../select-address/select-address.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceappService } from './../../service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';
import { LocaisEnderecoComponent } from '../locais-endereco/locais-endereco.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private crud: CrudService, public service: ServiceappService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.service.resetDadosEmpresa();

    this.activatedRoute.queryParams.subscribe(params => {

      if (params.loja) {
      this.crud.get_api('buscar-empresa-nome&loja=' + params.loja).subscribe(data => {
        if (data.erro) { alert('Erro ao tentar carregar configurações da loja'); return; }
        this.service.setDadosEmpresa(data.empresas[0]);
        this.service.showInfoStore = data.config.info;
        setTimeout(() => {
          if (!this.service.statusJanelaEndereco) {
            // this.selecionarEndereco();
            this.service.statusJanelaEndereco = true;
          }
        }, 500);
      });
    }

 });

    setTimeout(() => {

      this.crud.get_api('empresas-especifica&ident=' + this.service.getIdEmpresa()).subscribe(data => {
        if (data.erro) { alert('Erro ao tentar carregar configurações da loja'); return; }
        this.service.setDadosEmpresa(data.empresas[0]);
        this.service.showInfoStore = data.config.info;
        setTimeout(() => {
          if (!this.service.statusJanelaEndereco) {
            // this.selecionarEndereco();
            this.service.statusJanelaEndereco = true;
          }
        }, 500);
      });

    }, 800);

  }

  selecionarEndereco() {
    const dialogRef = this.dialog.open(SelectAddressComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
