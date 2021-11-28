import { CrudService } from './../../service/crud.service';
import { BagService } from 'src/app/inicio/bag/bag.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  statusLogin = false;

  constructor(private cookies: CookieService,  public service: ServiceappService, private bagServ: BagService,
              private crud: CrudService) { }

  loginPorCOOKIES() {
    // if (this.cookies.check('user')) {
      if (sessionStorage.getItem('user')) {
      try {
        console.warn('Usuário tem dados salvos cookies para fazer login');
        // if (this.cookies.check('address_user')) {
          if (sessionStorage.getItem('address_user')) {
          const address = JSON.parse(sessionStorage.getItem('address_user'));
          this.bagServ.setEnderecoEntrega(address);
        }

      } catch (e) { console.log(e); }
    } else {
       console.warn('Usuário ainda não fez o login');
    }

    // if (this.cookies.check('user')) {
      if (sessionStorage.getItem('user')) {
        console.warn('Faz login automático!!!!!!!!!!!!!!!!!!!!!!!!!!');
        setTimeout(() => { this.entrar(); }, 600);

    } else {
      console.log('NÃO Faz login automático!!!!!!!!!!!!!!!!!!!!!!!!!!');

    }
  }

  entrar() {
    if (this.statusLogin) {
      console.log('Usuário já está logado');
      return;
    }
    const a = () => {
      const r = this.service.getRespostaApi();
      if (r.erro) {
        /*this.service.mostrarMensagem(r.detalhes);*/
        this.cookies.deleteAll();
        sessionStorage.removeItem('user')
        return;
      }
      this.service.setDadosUsuario(r.resultado);
      this.service.setToken(r.resultado.token);
      this.setStatusLogin(true);
    };

    this.crud.post_api('login', a, {
      // email: this.cookies.get('user'),
      // senha: this.cookies.get('pass')
      email: sessionStorage.getItem('user'),
      senha: sessionStorage.getItem('pass')
    }, false);

  }

  getStatusLogin() {
    return this.statusLogin;
  }
  setStatusLogin(status: boolean) {
    if (!status) { console.log('erro ao tentar adicionar status login'); return; }
    return this.statusLogin = status;
  }

}
