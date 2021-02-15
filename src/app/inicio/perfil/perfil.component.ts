import { BagService } from 'src/app/inicio/bag/bag.service';
import { LoginService } from './../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectAddressComponent } from './../select-address/select-address.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceappService } from './../../service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constConsultaEmpresa = 0;

  constructor(private crud: CrudService,
              public service: ServiceappService,
              private dialog: MatDialog,
              private router: Router,
              private loginServ: LoginService,
              private bagServ: BagService) { }

  ngOnInit(): void {

    this.service.resetDadosEmpresa();


    if (this.service.perfilEmpresa === true) {
      const ttta = setInterval( () =>  {
      // console.log('Pesquisa empresa logo que tiver o ID');

      if (this.service.getIdEmpresa()) {
          this.carregaDadosLoja();
          clearInterval(ttta);
        }
      if (this.constConsultaEmpresa === 20) {
          // console.error('Não foi possível localizar a empresa por causa do ID');
          clearInterval(ttta);
          this.router.navigate(['buscar-lojas']);
        } else { this.constConsultaEmpresa++; }
      }, 700);
    } else {
      setTimeout(() => {
        this.carregaDadosLoja();
      }, 800);
    }

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

      // Adiciona itens salvos da sessao
      try {
        if (data.carrinho.itens && this.bagServ.getQntItensCar() === 0) {
          data.carrinho.itens.forEach(element => {
            this.bagServ.addItemCarrinho(element);
          });
        }
      } catch (e) { console.log('no-itens-car'); }
      try {
        if (data.login.itens) {
          // Se o usuario já tiver logando nao faz login
          if ( this.service.getDadosUsuario().email ) { return; }
          const a = () => {
            const r = this.service.getRespostaApi();
            if (r.erro) { return; }
            this.service.setDadosUsuario(r.resultado);
            // this.service.setToken(r.resultado.token);
          };
          const dataLog = { email: data.login.itens.email, id: data.login.itens.id, tipo: 'FACEBOOK' };
          this.crud.post_api('login&tipo=facebook', a, dataLog, false);
        }

      } catch (e) { console.log('no-login-auto'); }

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
