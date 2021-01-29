import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServiceappService {

  // private urlapi = 'https://api.vulto.site/index.php';
  private urlapi = 'http://10.0.0.104/sistema_zecarlos/apiVulto/index.php';
  // private urlapi = 'https://jfortalapi.ecig.app/index.php';
  private API = 'apiCliente';
  private token = '';
  private respApi: any;
  private dadosEmpresa = {
    id: '', imagem: '', capa: 'default', nome: '',
    categorias: [{nome: '', selecionado: false, itens: [{}, {}, {}, {}]}], cidade: '', coordenadas: '',
    formasfuncionamento: { nome: '', tipo: '', disponivel: false },
    formaspagamento: '', hrfun: '', locais_entrega: [], nota: { nota: '', totalavals: '' }, numero: '', rua: '', seguimento: '', status: '',
    tags: [], telefone: '', taxaentrega: '', taxa_entrega: 0,
    tempoentrega: '', descricao: '', bairro: '', cep: '', pedidomin: 0,

  };
  private idEmpresa = 24; // jfortal
  private statusLoaderStore = false;
  private statusBtBag = true;

  private dadosUsuario = {
    tipo: '',
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
  public defaultImage = './assets/images/others/defaultImagem.png';

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPositionBottom: MatSnackBarVerticalPosition = 'bottom';
  verticalPositionTop: MatSnackBarVerticalPosition = 'bottom';

  public statusJanelaEndereco = false;
  public sistemMultStores = true; // Sistema para varias LOJAS
  private empresas: Array<any>;
  private destaques: Array<any>;
  private categoriasempresa: Array<any>;
  descLoader = '';
  // tslint:disable-next-line: max-line-length
  descFotter = 'Voltar para a home © Copyright 2021 - iFood - Todos os direitos reservados iFood com Agência de Restaurantes Online S.A. CNPJ 14.380.200/0001-21 / Avenida dos Autonomistas, nº 1496, Vila Yara, Osasco/SP - CEP 06.020-902 F';
  constructor(private snackBar: MatSnackBar, private cookies: CookieService) {

    if (this.cookies.check('user')) {
      console.warn('Usuário com dados para login no cookies');
      console.log(this.cookies.get('user'));
      console.log(this.cookies.get('pass'));
    } else {
      console.log('Usuário ainda não fez o login');
    }

  }


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

    if (window.innerWidth < 600) {

      this.snackBar.open(message, action, {
        duration: 4000,
        verticalPosition: 'top'
      });

    } else {
      this.snackBar.open(message, action, {
        duration: 4000,
        verticalPosition: 'bottom'
      });
    }

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

  setToken(token: string) {
    this.token = token;
  }

  setRespostaApi(resp: any) { this.respApi = resp; }
  getRespostaApi() { return this.respApi; }

  setDadosEmpresa(empresa: any) {
    this.cookies.set('idEmpresa', empresa.id);
    this.dadosEmpresa = empresa; this.statusLoaderStore = true;
  }
  getDadosEmpresa() { return this.dadosEmpresa; }

  setHost(host: string, api: string) {
    // this.urlapi = host;
    // this.API = api;
  }

  setIdEmpresa(id: number) {
    this.idEmpresa = id;
  }
  getIdEmpresa() {
    if (!this.idEmpresa) { alert('Não foi possível identificar o código da loja'); }
    return this.idEmpresa;
  }

  getStatusLoaderStore(): boolean { return this.statusLoaderStore; }
  setStatusLoaderStore(status: boolean) { this.statusLoaderStore = status; }

  setDadosUsuario(usuario: any): void { this.dadosUsuario = usuario; }
  setDadosUsuarioEndereco(endereco: any): void { this.dadosUsuario.endereco = endereco; }
  getDadosUsuario() { return this.dadosUsuario; }

  setStatusBtbag(status: boolean) { this.statusBtBag = status; }
  getStatusBtbag(): boolean { return this.statusBtBag; }

  setEmpresas(empresas: Array<any>) {
    this.empresas = empresas;
  }
  getEmpresas(): Array<any> {
    return this.empresas;
  }

  setDestaques(itens: Array<any>) {
    this.destaques = itens;
  }
  getDestaques(): Array<any> {
    return this.destaques;
  }
  setCategoriasEmpresa(itens: Array<any>) {
    if (!itens) { return; }
    this.categoriasempresa = itens;
  }
  getCategoriasEmpresa(): Array<any> {
    return this.categoriasempresa;
  }
}
