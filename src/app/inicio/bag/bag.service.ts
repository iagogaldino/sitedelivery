import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  public statusBagFix = false;

  private carrinho = {
    id_empresa: false,
    cliente: '',
    itens: [],
    subtotal: 0,
    origempedido: false,
    status_pedido: 0,
    formasPagamento: [],
    formapagamento: { tipo: '', troco: 0, nome: 'false' },
    item_pagamento: { id: '', nome: '', status: false },
    desconto: 0,
    cupom: {
      datafim: '',
      id: '',
      info: '',
      status: true,
      status_texto: '',
      texto: '',
      titulo: '',
      valor: '',
    },
    total: 0,
    total_pedido: 0,
    taxaentrega: 0,
    taxaextra: '',
    tipopedido: 'false',
    endereco: {
      nome_endereco: '',
      rua: '',
      numero: {},
      bairro: { nome: '' },
      complemento: '',
      cidade: { nome: '' },
      estado: '',
      pais: 'Brasil',
      latitude: '',
      longetude: '',
      tiporesidencia: ''
    },
    empresa: {
      id: '',
      imagem: '',
      nome: '',
      telefone: '',
    }
  };
  tiposheet: any;
  bottomSheet: any;
  cadastroClienteLista: any;
  contaddFps = 0;
  private formadepagamento = { dinheiro: 'dinheiro', cartao: { nome: 'cartao', cartoes: [] } };
  private tipoPedido = { entrega: 'entrega', retirada: 'retirada' };
  selectedIndex: 0;
  taxaEntregaMomoria = 0;
  statusshowcupom = false;
  constructor(private service: ServiceappService, private crud: CrudService, private cookies: CookieService) { }





  addFp(item: any) {
    this.contaddFps++;
    item.referencia = this.contaddFps;

    const statusadd = false;
    this.carrinho.formasPagamento.forEach(element => {
      if (element.id === item.id) {
        // statusadd = true;
      }
    });
    const fp = Object.assign({}, item);
    if (!statusadd) { this.carrinho.formasPagamento.push(fp); }
    console.log(this.carrinho.formasPagamento);
  }

  removeItemFp(item: any) {
    let indeArray: any;
    for (const x in this.carrinho.formasPagamento) {
      if (this.carrinho.formasPagamento[x] === item) {
        indeArray = x;
      }
    }
    this.carrinho.formasPagamento.splice(indeArray, 1);
  }

  setSelectedIndex(index) { this.selectedIndex = index; }
  getSelectedIndex() { return this.selectedIndex; }

  setCadastroClienteLista(cliente: any) { this.cadastroClienteLista = cliente; }
  getCadastroClienteLista() { return this.cadastroClienteLista; }

  setSubtotal(valor: any) { this.carrinho.subtotal = valor; }


  setEmpresaCarrinho(empresa: any) {
    this.carrinho.empresa.id = empresa.id;
    this.carrinho.empresa.imagem = empresa.imagem;
    this.carrinho.empresa.nome = empresa.nome;
    this.carrinho.empresa.telefone = empresa.telefone;
  }

  setOrigemPedido(origem) { this.carrinho.origempedido = origem; }
  getOrigemPedido() { this.bottomSheet.dismiss(); return this.carrinho.origempedido; }

  setIdEmpresaCar(id) {
    this.carrinho.id_empresa = id;
  }
  getIdEmpresaCar() {
    return this.carrinho.id_empresa;
  }

  setTipoPedido(tipo: string) {// entrega ou retirada
    this.carrinho.tipopedido = tipo;
  }

  setCliente(id: any) {
    this.carrinho.cliente = id;
  }

  setCupomCarrinho(cupom: any) {
    this.carrinho.cupom = cupom;
  }

  setDescontoCarrinho(valor: number) {
    this.carrinho.desconto = valor;
  }
  getDescontoCarrinho() {
    return this.carrinho.desconto;
  }

  limparCarrinho() {
    this.carrinho.itens = [];
    this.carrinho.formasPagamento = [];
    this.carrinho.taxaextra = '';
    this.carrinho.taxaentrega = 0;
    this.carrinho.origempedido = false;
    this.carrinho.total = 0;
    this.carrinho.total_pedido = 0;
    this.carrinho.subtotal = 0;
    this.carrinho.desconto = 0;
    this.carrinho.cliente = '';
    this.carrinho.tipopedido = 'false';
  }

  getTipoPedido() {
    return this.carrinho.tipopedido;
  }

  setCidadeEnderecoEntrega(cidade: any) {
    this.carrinho.endereco.cidade = cidade;
    console.log(this.carrinho);
  }

  setBairroEnderecoEntrega(bairro: any) {
    this.carrinho.endereco.bairro = bairro;
  }

  getDeliveryfee(c: any, b: any) {
    const fun = () => {
      const res = this.service.getRespostaApi();
      if (res.erro === true) {

        this.service.mostrarMensagem(res.detalhes);

      } else {
        this.setTaxaEntrega(res.resultado, false);
        // this.service.mostrarMensagem(res.detalhes);
      }
    };

    this.crud.post_api('getDeliveryFee', fun, {idCidade: c, idBairro: b, idEmpresa: this.cookies.get('idEmpresa')});
  }

  setEnderecoEntrega(endereco: any) {
    this.carrinho.endereco = endereco;
    // this.setTaxaEntrega(parseFloat(endereco.bairro.taxa), false);
    this.getDeliveryfee(endereco.cidade.id, endereco.bairro.id);
    console.log(this.carrinho);
  }

  getEnderecoEntrega() {
    return this.carrinho.endereco;
  }

  setItensEndereco(form: { rua, numero, complemento, tiporesidencia }) {
    this.carrinho.endereco.rua = form.rua;
    this.carrinho.endereco.numero = form.numero;
    this.carrinho.endereco.complemento = form.complemento;
    this.carrinho.endereco.tiporesidencia = form.tiporesidencia;
    console.warn('Endereço salvo');
    console.log(this.carrinho.endereco);
  }

  getStatusEndereco(): boolean {
    if (!this.carrinho.endereco.cidade) { return false; }
    if (!this.carrinho.endereco.bairro) { return false; }
    if (!this.carrinho.endereco.rua) { return false; }
    if (!this.carrinho.endereco.numero) { return false; }
    if (!this.carrinho.endereco.complemento) { return false; }
    return true;
  }

  getConfigTipoPedido() {
    return this.tipoPedido;
  }
  getFP() {
    return this.formadepagamento;
  }

  getFPUsuario() {
    return this.carrinho.formapagamento;
  }
  setFormaPag(fp: any) {
    this.carrinho.formapagamento.tipo = fp.tipo;
    this.carrinho.formapagamento.nome = fp.nome;
    this.carrinho.formapagamento.troco = fp.troco;
    console.log(this.carrinho);
  }

  setTroco(valor: number) {
    this.carrinho.formapagamento.troco = valor;
  }

  getCarrinho() {
    return this.carrinho;
  }

  getQntItensCar(): number {
    return this.carrinho.itens.length;
  }

  setTaxaEntrega(valor: number, taxaEntregaMomoria: boolean) {
    if (!valor) { valor = 0; }
    this.carrinho.taxaentrega = valor;
    if (!taxaEntregaMomoria) {
      console.log('Muda memoria taxa');
      this.taxaEntregaMomoria = valor;
    }
  }

  getTaxaEntrega(): number {
    return this.carrinho.taxaentrega;
  }

  addItemCarrinho(item: any) {
    if (!item) { console.error('Erro ao tentar adicionar o item ao carrinho!'); return false; }
    this.alteraValorCarrinhoSOMA(item.preco);
    this.carrinho.itens.push(item);

    let indexitemarray = 0;
    for (let x = 0; x < this.carrinho.itens.length; x++) {
      indexitemarray = x;
    }
    console.log(indexitemarray);
    this.carrinho.itens[indexitemarray].indiceitemarray = indexitemarray;
    // alert('Item adicionado com sucesso');
    console.log(this.carrinho);
    // Quando adicionar o item  carrinho as formaasss de pagamentos resetam
    this.carrinho.formasPagamento = [];
    return true;
  }

  getItensCarrinho() {
    return this.carrinho.itens;
  }

  getSubTotalCarrinho(): number {
    let total = 0;
    this.carrinho.itens.forEach(element => {
      total += element.total;
    });
    return total;
  }

  getTotalCarrinho(): number {
    let total = 0;
    let res = 0;
    this.carrinho.itens.forEach(element => {
      total += element.total;
    });
    // Calcular com desconto
    total = total - this.carrinho.desconto;
    // Calcular com taxa de entrega
    res = total + this.carrinho.taxaentrega;
    if (res < 0) { res = 0; }
    return res;
  }


  private alteraValorCarrinhoSOMA(valor: any) {
    if (!valor) { valor = 0; }
    this.carrinho.total += parseFloat(valor);
  }
  private alteraValorCarrinhoSUB(valor: any) {
    if (!valor) { valor = 0; }
    this.carrinho.total -= parseFloat(valor);
  }

  removeItemCar(item: any) {
    let indeArray: any;
    for (const x in this.carrinho.itens) {
      if (this.carrinho.itens[x] === item) {
        indeArray = x;
      }
    }
    this.carrinho.itens.splice(indeArray, 1);
    // Quando adicionar o item  carrinho as formaasss de pagamentos resetam
    this.carrinho.formasPagamento = [];
  }

  atualizaItem(item, indiceitemarray) {
    console.log('#atualizaItem');
    console.log(indiceitemarray);
    console.log('===========');

    for (const x in this.carrinho.itens) {
      if (this.carrinho.itens[x].indiceitemarray === indiceitemarray) {
        this.carrinho.itens[x] = item;
        console.log('Att item');
        console.log(item);
      }
    }
  }

  atualizaTotalComTaxa() {
    // funcao é chamada somente quando for para enviar o pedido para o servidor
    this.carrinho.total_pedido = this.getTotalCarrinho();
  }


  setTipoSheet(tipo, bottomSheet) {
    this.tiposheet = tipo;
    this.bottomSheet = bottomSheet;
  }

  getTipoSheet() {
    return this.tiposheet;
  }

  onclickEntregaTipo() {
    if (this.service.getDadosEmpresa().formasfuncionamento.tipo === '2') {
      // Verifica as formas de servico da empresa
      this.service.mostrarMensagem('A loja só aceita pedidos para retirada');
      return;
    }
    this.setTaxaEntrega(this.taxaEntregaMomoria, true);
    this.setTipoPedido(this.getConfigTipoPedido().entrega);

    setTimeout(() => { this.service.mostrarMensagem('Você selecionou pedido para entrega'); }, 500);
  }

  onclickRetiradaTipo() {
    console.log('onclickRetiradaTipo');
    if (this.service.getDadosEmpresa().formasfuncionamento.tipo === '1') {
      // Verifica as formas de servico da empresa
      this.service.mostrarMensagem('A loja só aceita pedidos para entrega');
      return;
    }
    this.setTaxaEntrega(0, true);
    this.setTipoPedido('retirada');
    setTimeout(() => { this.service.mostrarMensagem('Você selecionou pedido para retirada'); }, 500);
  }

  onClickFp(item) {
    // if (item.nome === 'Dinheiro' || item.nome === 'dinheiro') { this.onclickFPDinheiro(item); }
    // if (item.nome === 'cartao' || item.nome === 'Cartão') { this.onclickFPCartao(); }
    /*if (item.nome === 'Fiado' || item.nome === 'Fiado') {
      this.carrinho.item_pagamento.status = false;
     }
    */
    this.addFp(item);
    this.bottomSheet.dismiss();
    /*
    this.setFormaPag({tipo: item.nome, nome: item.nome, troco: ''});
    setTimeout( () => {
       this.service.mostrarMensagem('Pagamento selecionado: ' + item.nome);
       if (item.nome === 'Tranferência bancária') {
         console.log('Selecionar o banco');
         this.funcaoEmitter.emit();
        }

       if (item.nome.toLowerCase() === 'cartão'
       || item.nome.toLowerCase() === 'cartão de crédito'
       || item.nome.toLowerCase() === 'cartão de débito'
       || item.nome.toLowerCase() === 'cartão poupança') {
          console.log('Selecionar o banco');
          this.selecionarCartao.emit(item);
         }


      }, 700 );
  */
  }

  onclickFPDinheiro(item) {
    console.log('onclickFPDinheiro');
    console.log(item);
    // if (this.service.getDadosEmpresa().formaspagamento[0].disponivel === false) {
    // Verifica as formas de pagamento da empresa
    this.service.mostrarMensagem('Este estabelecimento não aceita pagamento em dinheiro');
    // return;
    // }

    this.bottomSheet.dismiss();
    this.setFormaPag({ tipo: 'dinheiro', nome: 'dinheiro', troco: '' });
    this.carrinho.item_pagamento.status = false;
    setTimeout(() => { this.service.mostrarMensagem('Pagamento em dinheiro selecionado'); }, 700);


  }


  onclickFPCartao() {
    this.bottomSheet.dismiss();

    /*if (this.service.getDadosEmpresa().formaspagamento[1].disponivel === false) {
      // Verifica as formas de pagamento da empresa
        this.service.mostrarMensagem('Este estabelecimento não aceita pagamento em cartão');
        return;
      }
  */
    this.setFormaPag({ tipo: 'cartão', nome: 'cartão', troco: '' });
    setTimeout(() => { this.service.mostrarMensagem('Pagamento com cartão selecionado'); }, 700);
  }

  verificaFpsTotal() {
    let total = 0;
    this.carrinho.formasPagamento.forEach(element => {
      total += parseFloat(element.valor);
    });
    return total;
  }

  verificaFp() {
    // Se existir forma de pagamento selecionada retornar  true
    let statusErro = false;
    this.carrinho.formasPagamento.forEach(element => {
      statusErro = true;
    });
    return statusErro;
  }

  showCupom(status: boolean) {
    console.log('showCupom');
    this.statusshowcupom = status;
  }

  getStatusShow(): boolean {
    return this.statusshowcupom;
  }


}
