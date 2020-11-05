import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceappService {

  private urlapi = 'HOST DEFINIDO NO ARQUIVO JSON EM ASSETS';
  private API = 'DEFINIDO NO ARQUIVO JSON EM ASSETS';
  private token = '';
  private respApi: any;
  private dadosEmpresa = {imagem: '', capa: '', nome: '', categorias: '', cidade: '', coordenadas: '', formasfuncionamento: {nome: ''},
  formaspagamento: '', hrfun: '', locais_entrega: '', nota: {nota: '', totalavals: ''}, numero: '', rua: '', seguimento: '', status: '',
  tags: [], telefone: '',
  tempoentrega: '', descricao: ''};
  private idEmpresa = 24;

  constructor() { }

  getApiAcao(acao: string, mostrarProgresso?: boolean) {
    // if (mostrarProgresso) { this.servProg.showProgress.emit(mostrarProgresso); }

    console.log(this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API);
    return this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API;
  }

  setRespostaApi(resp: any) {
    this.respApi = resp;
  }

  setDadosEmpresa(empresa: any) { this.dadosEmpresa = empresa; }
  getDadosEmpresa() { return this.dadosEmpresa; }

  setHost(host: string, api: string) {
    this.urlapi = host;
    this.API = api;
  }

  getIdEmpresa() { return this.idEmpresa; }

}
