import { CookieService } from 'ngx-cookie-service';
import { LojasService } from './../../multLojas/lojas/lojas.service';
import { Router } from '@angular/router';
import { LocaisEnderecoComponent } from './../locais-endereco/locais-endereco.component';
import { RecuperarSenhaComponent } from './../content/recuperar-senha/recuperar-senha.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { SelecionarEnderecoBuscarLojaComponent } from 'src/app/multLojas/selecionar-endereco-buscar-loja/selecionar-endereco-buscar-loja.component';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  configApp: any;

  constructor(private lojaServ: LojasService,
              private dialog: MatDialog,
              private router: Router,
              private servico: ServiceappService,
              private crud: CrudService,
              private cookie: CookieService) { }

  ngOnInit(): void {
    if (!this.servico.sistemMultStores) {
      this.router.navigate(['/404']);
      return;
    }
    if (this.cookie.get('user') && this.cookie.get('pass') && !this.lojaServ.autoLogin) {
      this.lojaServ.autoLogin = true;
      this.entrar();
    }
  }

  seleionarEndereco(): void {
    const dialogRef = this.dialog.open(SelecionarEnderecoBuscarLojaComponent, {
      width: '590px',
      data: this.configApp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['lojas']);
      }
      if (result === 'entrar') {
        this.router.navigate(['/entrar']);
      }
    });
  }
  entrar() {
    console.log('Auto login');

    const a = () => {
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro) {  return; }
      this.servico.setDadosUsuario(r.resultado);
      this.servico.setToken(r.resultado.token);
      setTimeout( () => {
        // this.servico.mostrarMensagem('Seja bem vindo ' + r.resultado.nome + '!');
        // Salva COOKIES DO USU
        this.router.navigate(['/lojas']);
      } , 600 );
    };
    this.crud.post_api('login', a, {email: this.cookie.get('user'), senha:  this.cookie.get('pass')}, false);
  }

}
