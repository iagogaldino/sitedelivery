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
    id: '', imagem: '', capa: '', nome: '', categorias: '', cidade: '', coordenadas: '',
    formasfuncionamento: { nome: '', tipo: '', disponivel: false },
    formaspagamento: '', hrfun: '', locais_entrega: [], nota: { nota: '', totalavals: '' }, numero: '', rua: '', seguimento: '', status: '',
    tags: [], telefone: '', taxaentrega: '', taxa_entrega: 0,
    tempoentrega: '', descricao: '', bairro: '', cep: ''
  };
  private idEmpresa = 24;
  private statusLoaderStore = false;
  private statusBtBag = true;

  private dadosUsuario = {
    cpf: '',
    datanascimento: '',
    email: '',
    endereco: [],
    favoritos: '',
    id: '',
    imagem: '',
    info: '',
    nome: '',
    onesignal_id: '',
    qntpedidos: '',
    sobrenome: '',
    status_conta: '',
    telefone: '',
    token: '',
    ultimo_endereco: '',
    ultimoacesso: '',

    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    complemento: '',
    ponto_referencia: '',

  };

  public statusJanelaEndereco = false;

  constructor(private snackBar: MatSnackBar) { }


  setDadosUsuarioNome(dados: any) {
    console.log(dados);
    this.dadosUsuario.nome = dados;
  }
  setDadosUsuarioSNome(dados: any) {
    console.log(dados);
    this.dadosUsuario.sobrenome = dados;
  }
  setDadosUsuarioTel(dados: any) {
    console.log(dados);
    this.dadosUsuario.telefone = dados;
  }
  setDadosUsuarioCpf(dados: any) {
    console.log(dados);
    this.dadosUsuario.cpf = dados;
  }
  setDadosUsuarioDataNasc(dados: any) {
    console.log(dados);
    this.dadosUsuario.datanascimento = dados;
  }

  mostrarMensagem(msg: string) {
    // alert(msg);
    this.openSnackBar(msg, 'Fechar');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  addEnderecoUsuario(endereco: any) {
    console.log(typeof this.getDadosUsuario().endereco);
    console.log(this.getDadosUsuario().endereco);
    this.dadosUsuario.endereco.push(endereco);
  }

  getApiAcao(acao: string, mostrarProgresso?: boolean) {
    // if (mostrarProgresso) { this.servProg.showProgress.emit(mostrarProgresso); }

    console.log(this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API);
    return this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API;
  }

  setRespostaApi(resp: any) { this.respApi = resp; }
  getRespostaApi() {return this.respApi; }

  setDadosEmpresa(empresa: any) { this.dadosEmpresa = empresa; this.statusLoaderStore = true; }
  getDadosEmpresa() { return this.dadosEmpresa; }

  setHost(host: string, api: string) {
    this.urlapi = host;
    this.API = api;
  }

  getIdEmpresa() { return this.idEmpresa; }

  getStatusLoaderStore(): boolean { return this.statusLoaderStore; }
  setStatusLoaderStore(status: boolean) { this.statusLoaderStore = status; }

  setDadosUsuario(usuario: any): void { this.dadosUsuario = usuario; }
  setDadosUsuarioEndereco(endereco: any): void { this.dadosUsuario.endereco = endereco; }
  getDadosUsuario() { return this.dadosUsuario; }

  setStatusBtbag(status: boolean) { this.statusBtBag = status; }
  getStatusBtbag(): boolean { return this.statusBtBag; }



}
