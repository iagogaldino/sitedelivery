import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Injectable({
  providedIn: 'root'
})
export class LojasService {
  cidadesSistema: Array<any>;
  cidade = {id: 0, nome: ''};
  bairro = {id: 0, nome: ''};
  autoLogin = false;
  token = '';
  constructor(private servico: ServiceappService, private crud: CrudService, private cookie: CookieService) {
    this.config();
  }

  setEnderecoCidade(cidadeSelecionada: any) {
    this.cidade = {id: cidadeSelecionada.id, nome: cidadeSelecionada.nome};
  }
  setEnderecoBairro(bidadeSelecionado: any) {
    this.bairro = bidadeSelecionado;
  }

  getEnderecoSelecionado() {
    const c = { ci: this.cidade, ba: this.bairro };
    return c;
  }
  getCidadesSistema() {
    return this.cidadesSistema;
  }

  config() {
    const a = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro) { this.servico.mostrarMensagem(r.detalhes); return; }
      this.servico.setDestaques(r.categoriasdestaques);
      this.servico.setCategoriasEmpresa(r.categoriasempresa);
      this.cidadesSistema = r.cidades;
      this.servico.descFotter = r.config.descf;
      this.servico.urlDashEmpresa = r.config.url_dash;
      this.servico.URLFacebook = r.config.URLFacebook;
      this.servico.URLFacebookOuth = r.config.URLFacebookOuth;
      if (this.servico.loginFacebook === false) {
      this.servico.loginFacebook = r.config.loginf;
      }
      if (this.cookie.check('token')) {
        this.servico.setToken(this.cookie.get('token'));
      } else {
        this.servico.setToken(r.token);
      }
    };
    if (this.cookie.check('token')) {
      this.token = this.cookie.get('token');
    }
    this.crud.post_api('config&token=' + this.token, a, '', false);

    try {
    const e = JSON.parse(this.cookie.get('endereco'));
    this.setEnderecoCidade(e.ci);
    this.setEnderecoBairro(e.ba);
    if (e.ci.nome && e.ba.nome) { this.buscarLojas(); }
    } catch (e) { /*console.log('nao ha endereco salvo');*/ }
  }

  buscarLojas() {
    const a = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro) { this.servico.mostrarMensagem(r.detalhes); return; } else {
        this.servico.setEmpresas(r.empresas);
        this.servico.descLoader = r.detalhes;
      }
    };
    this.crud.post_api('empresas-local', a,
    {
      cidade: this.getEnderecoSelecionado().ci,
      bairro: this.getEnderecoSelecionado().ba
    },
      false);

  }

}
