import { LoginService } from './../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectAddressComponent } from './../select-address/select-address.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceappService } from './../../service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';
import { LocaisEnderecoComponent } from '../locais-endereco/locais-endereco.component';
import { CookieService } from 'ngx-cookie-service';
import { BagService } from '../bag/bag.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private crud: CrudService, public service: ServiceappService, private dialog: MatDialog,
              private router: Router, private loginServ: LoginService) { }

  ngOnInit(): void {

    this.service.resetDadosEmpresa();


    setTimeout(() => {
      if (!this.service.getIdEmpresa() && this.service.sistemMultStores === true) {
        this.router.navigate(['/lojas']);
        return;
      }
      this.carregaDadosLoja();

    }, 800);

  }

  carregaDadosLoja() {
    this.crud.get_api('empresas-especifica&ident=' + this.service.getIdEmpresa()).subscribe(data => {
      if (data.erro) {
        // Terminar essa config
         if (this.service.sistemMultStores) {
           this.router.navigate(['/lojas']);
           console.error('Erro ao tentar pegar configurações da loja - MULTLOJAS');
         }
         console.error('Erro ao tentar pegar configurações da loja - LOJA UNICA');
         return;
        }
      this.service.setDadosEmpresa(data.empresas[0]);
      this.service.showInfoStore = data.config.info;
      setTimeout(() => {
        this.loginServ.loginPorCOOKIES();
        if (!this.service.statusJanelaEndereco) {
          // this.selecionarEndereco();
          this.service.statusJanelaEndereco = true;
        }
        if (this.service.itemLoader) {
          this.router.navigate(['/item-datails/' + this.service.itemLoader]);
          this.service.itemLoader = '';
        }
      }, 500);
    });
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
