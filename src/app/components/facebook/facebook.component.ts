import { LojasService } from 'src/app/multLojas/lojas/lojas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CrudService } from 'src/app/service/crud.service';
import { MatDialog } from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  statusBT = false;
  urlFacebook: any;
  tokenface: any;
  constructor(private authService: SocialAuthService, private cookies: CookieService, public service: ServiceappService,
              private router: Router, private crud: CrudService, private dialog: MatDialog, public sanitizer: DomSanitizer,
              private http: HttpClient, private activatedRoute: ActivatedRoute, private lojasServ: LojasService) {

               }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( params => {
      this.tokenface = params.tokenface;
      if (this.tokenface) {

        const tint = setInterval ( () => {
          if (this.service.URLFacebookOuth) {
            this.signInWithFB();
            clearInterval(tint);
          }
        } , 600);


      }
    } );
  }

 /* signInWithFB(): void {
    this.statusBT = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {

      if (data.authToken && data.email) {
        console.log(data);
        /*
        Quando ta fazendo o login pelo instagram o facebook nao consegue da a resposta,
        pois sai da pagina do site e quando volta, volta sem resp.
        */
       /* this.setSession(data);
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
  }*/


  signInWithFB() {
    this.statusBT = true;
    this.http.get
    (this.service.URLFacebookOuth + '' + this.tokenface).subscribe((data: any) => {
      if (data === 0) {
        window.location.href = this.service.URLFacebook + '' + this.service.getToken();
      } else {
        console.log(data);
        const dadoscadastro = {
          email: data.email,
          idface: data.id,
          imagem: data.picture_url,
          nome: data.first_name,
          sobrenome: data.last_name,
        };
        this.service.setDadosUsuarioNome(data.first_name + ' ' + data.last_name);
        this.service.setDadosUsuarioSobreNome(data.lastName);
        this.service.setDadosUsuarioEmail(data.email);
        this.service.setDadosUsuarioIdFace(data.id);
        this.service.setDadosUsuarioImagem(data.picture_url);
        this.setSession('login', this.service.getDadosUsuario());

        this.cadastroContaFACE(dadoscadastro);

      }
    });

}

postCodeFACE(request: string) {
  const r = this.service.getRespostaApi();
  const a = () => {

  };
  this.crud.post_api('loginFacebook&acaof=codigo', a, '', false);
}

  setSession(nomeSession, dados: any) {
    const accallback = () => {

      const r = this.service.getRespostaApi();
      if (r.erro === true) {
        this.service.mostrarMensagem(r.detalhes);
      } else {
        this.cookies.set('token', r.resultado.token);
      }
    };
    this.crud.post_api('setSession', accallback, { nome: nomeSession, valor: dados }, true);
  }

  getSession(nomeSession: string) {
    const accallback = () => {

      const r = this.service.getRespostaApi();
      if (r.erro === true) {

      } else {
        this.router.navigate(['/xdelssy-delivery']);
      }
    };
    this.crud.post_api('recuperarSession', accallback, nomeSession, true);
  }

  cadastroContaFACE(dadosUsuario) {
    console.log(dadosUsuario);
    const a = () => {
      const r = this.service.getRespostaApi();
      if (r.erro) {
        this.service.mostrarMensagem('Não foi possível entrar com o Facebook');
      } else {
       this.entrar();
      }
      };
    this.crud.post_api('cadastro_usuario&tipo=facebook', a, dadosUsuario, false);

  }

  entrar() {
        const a = () => {
      const r = this.service.getRespostaApi();

      if (r.erro) { this.service.mostrarMensagem(r.detalhes); this.statusBT = false; return; }
      this.service.setDadosUsuario(r.resultado);
      this.service.setToken(r.resultado.token);
      setTimeout( () => {
        this.service.mostrarMensagem('Seja bem vindo ' + r.resultado.nome + '!');
        this.dialog.closeAll();
        if (this.router.url === '/' || this.router.url === '/bag') {
          // Se estiver na página da loja nao faz nada
        } else {
          if (this.cookies.check('tag_empresa')) {
            this.router.navigate(['/' + this.cookies.get('tag_empresa')]);
            setTimeout(()=> { this.cookies.delete('tag_empresa'); } , 600)
          } else {
            this.router.navigate(['']);
          }
        }

      } , 600 );
    };
        const dataLog = { email: this.service.getDadosUsuario().email, id: this.service.getDadosUsuario().idface, tipo: 'FACEBOOK' };
        this.crud.post_api('login&tipo=facebook', a, dataLog, false);

  }

}
