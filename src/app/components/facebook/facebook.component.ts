import { Router } from '@angular/router';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  statusBT = false;
  constructor(private authService: SocialAuthService, private cookies: CookieService, private service: ServiceappService,
              private router: Router, private crud: CrudService) { }

  ngOnInit(): void {
  }

  signInWithFB(): void {
    this.statusBT = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {

      if (data.authToken && data.email) {
        console.log(data);
        this.service.setDadosUsuarioNome(data.firstName + ' ' + data.lastName);
        this.service.setDadosUsuarioSobreNome(data.lastName);
        this.service.setDadosUsuarioEmail(data.email);
        this.service.setDadosUsuarioIdFace(data.id);
        this.service.setDadosUsuarioImagem(data.photoUrl);
        this.cadastroContaFACE();
      } else {
        this.statusBT = false;
      }
    });
  }

  cadastroContaFACE() {
      const a = () => {
      const r = this.service.getRespostaApi();
      this.entrar();
      };
      this.crud.post_api('cadastro_usuario&tipo=facebook', a, this.service.getDadosUsuario(), false);

  }

  entrar() {
        const a = () => {
      const r = this.service.getRespostaApi();

      if (r.erro) { this.service.mostrarMensagem(r.detalhes); this.statusBT = false; return; }
      this.service.setDadosUsuario(r.resultado);
      this.service.setToken(r.resultado.token);
      setTimeout( () => {
        this.service.mostrarMensagem('Seja bem vindo ' + r.resultado.nome + '!');
        this.router.navigate(['/lojas']);

      } , 600 );
    };
        const dataLog = { email: this.service.getDadosUsuario().email, id: this.service.getDadosUsuario().idface, tipo: 'FACEBOOK' };
        this.crud.post_api('login&tipo=facebook', a, dataLog, false);

  }

}
