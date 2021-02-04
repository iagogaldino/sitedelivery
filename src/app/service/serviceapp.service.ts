import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceappService {

  public sistemMultStores = false; // Sistema para varias LOJAS
  // private urlapi = 'https://api.vulto.site/index.php';
  // private urlapi = 'http://10.0.0.104/sistema_zecarlos/apiVulto/index.php';
   private urlapi = 'https://jfortalapi.ecig.app/index.php';
  private API = 'apiCliente';
  private token = '';
  private respApi: any;

  private skeletoDadosEmpresa = {
    id: '', imagem: '', capa: 'default', nome: '',
    categorias: [{nome: '', selecionado: false, itens: [{}, {}, {}, {}]}], cidade: '', coordenadas: '',
    formasfuncionamento: { nome: '', tipo: '', disponivel: false },
    formaspagamento: '', hrfun: '', locais_entrega: [], nota: { nota: '', totalavals: '' }, numero: '', rua: '', seguimento: '',
    status: false,
    tags: [], telefone: '', taxaentrega: '', taxa_entrega: 0,
    tempoentrega: '', descricao: '', bairro: '', cep: '', pedidomin: 0,
    status_delivery: false,
    desconto: {
      da: '',
      desconto: 0,
      df: '',
      di: '',
      statusPromocao: false
    }

  };

  private dadosEmpresa = this.skeletoDadosEmpresa;
  private idEmpresa = 24; // jfortal
  private statusLoaderStore = false;
  private statusBtBag = true;

  private dadosUsuario = {
    tipo: '',
    cpf: '',
    datanascimento: '',
    email: '',
    idface: '',
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
  public showInfoStore = false; // Mostrar informações da loja
  private empresas: Array<any>;
  private destaques: Array<any>;
  private categoriasempresa: Array<any>;
  descLoader = '';
  descFotter = '© Copyright 2021';
  urlDashEmpresa = '';
  constructor(private snackBar: MatSnackBar, private cookies: CookieService, private route: ActivatedRoute) { }

  resetDadosEmpresa() {
    this.dadosEmpresa = this.getSkeletoDadosEmp();
  }

  getSkeletoDadosEmp() {
    return this.skeletoDadosEmpresa;
  }


  setDadosUsuarioImagem(dados: any) {
    this.dadosUsuario.imagem = dados;
  }

  setDadosUsuarioSobreNome(dados: any) {
    this.dadosUsuario.sobrenome = dados;
  }

  setDadosUsuarioEmail(dados: any) {
    this.dadosUsuario.email = dados;
  }
  setDadosUsuarioIdFace(dados: any) {
    this.dadosUsuario.idface = dados;
  }

  setDadosUsuarioNome(dados: any) {
    // console.log(dados);
    this.dadosUsuario.nome = dados;
  }
  setDadosUsuarioSNome(dados: any) {
    // console.log(dados);
    this.dadosUsuario.sobrenome = dados;
  }
  setDadosUsuarioTel(dados: any) {
    // console.log(dados);
    this.dadosUsuario.telefone = dados;
  }
  setDadosUsuarioCpf(dados: any) {
    // console.log(dados);
    this.dadosUsuario.cpf = dados;
  }
  setDadosUsuarioDataNasc(dados: any) {
    // console.log(dados);
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
    // console.log(typeof this.getDadosUsuario().endereco);
    // console.log(this.getDadosUsuario().endereco);
    this.dadosUsuario.endereco.push(endereco);
  }

  getApiAcao(acao: string, mostrarProgresso?: boolean) {
    // if (mostrarProgresso) { this.servProg.showProgress.emit(mostrarProgresso); }

    // console.log(this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API);
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
