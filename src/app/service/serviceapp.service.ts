import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServiceappService {

  private urlapi = 'HOST DEFINIDO NO ARQUIVO JSON EM ASSETS';
  private API = 'DEFINIDO NO ARQUIVO JSON EM ASSETS';
  private token = '';
  private respApi: any;
  private dadosEmpresa = {
    imagem: '', capa: '', nome: '', categorias: '', cidade: '', coordenadas: '',
    formasfuncionamento: { nome: '', tipo: '', disponivel: false },
    formaspagamento: '', hrfun: '', locais_entrega: '', nota: { nota: '', totalavals: '' }, numero: '', rua: '', seguimento: '', status: '',
    tags: [], telefone: '', taxaentrega: '', taxa_entrega: 0,
    tempoentrega: '', descricao: ''
  };
  private idEmpresa = 24;
  private statusLoaderStore = false;

  constructor(private snackBar: MatSnackBar) { }

  mostrarMensagem(msg: string) {
    // alert(msg);
    this.openSnackBar(msg, 'Fechar');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  getApiAcao(acao: string, mostrarProgresso?: boolean) {
    // if (mostrarProgresso) { this.servProg.showProgress.emit(mostrarProgresso); }

    console.log(this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API);
    return this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API;
  }

  setRespostaApi(resp: any) {
    this.respApi = resp;
  }

  setDadosEmpresa(empresa: any) { this.dadosEmpresa = empresa; this.statusLoaderStore = true; }
  getDadosEmpresa() { return this.dadosEmpresa; }

  setHost(host: string, api: string) {
    this.urlapi = host;
    this.API = api;
  }

  getIdEmpresa() { return this.idEmpresa; }

  getStatusLoaderStore(): boolean { return this.statusLoaderStore; }
  setStatusLoaderStore(status: boolean) { this.statusLoaderStore = status; }

}
