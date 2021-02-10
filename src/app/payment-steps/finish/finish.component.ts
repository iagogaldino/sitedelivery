import { LojasService } from './../../multLojas/lojas/lojas.service';
import { TelefoneUsuarioComponent } from './../../inicio/telefone-usuario/telefone-usuario.component';
import { FormAddressComponent } from './../../conta_usuario/adresses/form-address/form-address.component';
import { LoginComponent } from './../../inicio/login/login.component';
import { CrudService } from './../../service/crud.service';
import { Router } from '@angular/router';
import { BagService } from './../../inicio/bag/bag.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { AddfpComponent } from './../addfp/addfp.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectAddressComponent } from 'src/app/inicio/select-address/select-address.component';
declare var $: any;
@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  statusLoaderEnviaPedido = false;
  statusBtenviar = false;
  form: FormGroup;
  statusbt = false;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  userTipo = false;
  constructor(public dialog: MatDialog, public service: ServiceappService, public bagServ: BagService,
              private router: Router, private fb: FormBuilder, private crud: CrudService, private lojasServ: LojasService) { }

  ngOnInit(): void {
    this.bagServ.setTipoPedido('entrega');
    this.service.setStatusBtbag(false);
    this.bagServ.setOrigemPedido('Web');

    if (this.service.getDadosUsuario().tipo === 'diamante') {
      this.userTipo = true;
    } else {
      this.userTipo = false;
    }

    if (!this.service.getDadosUsuario().id) { this.router.navigate(['']); }
    window.scrollTo(0, 0);

    this.form = this.fb.group({
      obspedido: [''],
    });
    this.form.controls.obspedido.valueChanges.subscribe(data => {
      this.bagServ.getCarrinho().observacao = data;
    });
  }

  addFp(item) {

    console.log('Tipo pedido');
    console.log(this.bagServ.getTipoPedido());

    if (this.bagServ.getItensCarrinho().length === 0) { this.service.mostrarMensagem('Seu carrinho está vázio. :('); return; }
    if (this.bagServ.getTipoPedido() === 'false') {
      console.log('Tipo pedido');
      console.log(this.bagServ.getTipoPedido());
      this.service.mostrarMensagem('Selesione o tipo do pedido.  Entrega/Retirada'); return;
    }
    if (this.bagServ.getCarrinho().cupom.status === false) {
      // Tem cupom selecionado
      if (this.bagServ.verificaFpsTotal() !== this.bagServ.getTotalCarrinho()) {
        console.log('Sem cupom');
        this.service.mostrarMensagem('O valor total das formas de pagamento já está diferente do valor total do pedido.');
        return;
      }
    } else {
      console.log('Sem cupom');
      if (this.bagServ.verificaFpsTotal() === this.bagServ.getTotalCarrinho()) {
        this.service.mostrarMensagem('O valor total das formas de pagamento já está igual ao valor total do pedido.');
        return;
      }
    }
    const dialogRef = this.dialog.open(AddfpComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  irFPs() {
    const href = $('#metodopagamento');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, 500);
  }
  irTpedido() {
    const href = $('#tipopedido');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, 500);
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: { router: false }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onClickFinalizarPedido() {
    // Verifica se o usuário fez o login
    if (!this.service.getDadosUsuario().id) {
      this.openLogin();
      return;
    }
    // console.log(this.form.value);
    if (this.bagServ.statusBairroEntrega === false && this.bagServ.getTipoPedido() === 'entrega') {
      this.service.mostrarMensagem('No momento não estamos entregando em seu endereço');
      return;
    }

    console.log(this.bagServ.getCarrinho());
    // Verifica se as formas de pagamento o total esta maior que o valor do pedido em se
    if (this.bagServ.verificaFpsTotal() > this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem('Os valores das formas de pagamento estão maior que o valor total do pedido');
      console.log(this.bagServ.verificaFpsTotal());
      return;
    }



    if (this.bagServ.getQntItensCar() < 1) { this.service.mostrarMensagem('O carrinho está vazio!'); return; }
    if (this.bagServ.verificaFp() === false && !this.bagServ.getCarrinho().cupom) {
      this.service.mostrarMensagem('Selecione a forma de pagamento deste pedido');
      return;
    }

    if (this.bagServ.getCarrinho().origempedido === false) {
      this.service.mostrarMensagem('Selecione a origem deste pedido');
      return;
    }

    if (this.bagServ.verificaFpsTotal() !== this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem
        ('O total da forma de pagamento está menor que o total do pedido.');
      this.irFPs();
      return;
    }

    // Verifica se foi selecionado a bandeira do carão em Cartao Crédito ou Déb.
    const nomeFp = this.bagServ.getCarrinho().formapagamento.nome.toLocaleLowerCase();
    console.log(nomeFp);

    if (this.bagServ.getCarrinho().tipopedido === 'false') {
      this.service.mostrarMensagem('Selecione a opção do pedido, se é para entrega ou para retirada');
      this.irTpedido();
      return;
    }
    if (this.bagServ.getCarrinho().endereco.rua === '' || !this.bagServ.getCarrinho().endereco.rua) {
      this.selecionarEndereco();
      this.service.mostrarMensagem('Informe o endereço de entrega');
      return;
    }
    if (this.bagServ.getCarrinho().endereco.cidade.nome === '') {
      this.selecionarEndereco();
      this.service.mostrarMensagem('Selecione a cidade do pedido');
      return;
    }
    if (this.bagServ.getCarrinho().endereco.bairro.nome === '') {
      this.service.mostrarMensagem('Selecione o bairro do pedido');
      this.selecionarEndereco();
      return;
    }

    this.bagServ.setCliente(this.service.getDadosEmpresa().id);
    this.bagServ.setIdEmpresaCar(this.service.getDadosEmpresa().id);
    if (this.bagServ.getSubTotalCarrinho() < this.service.getDadosEmpresa().pedidomin) {
      console.log(this.bagServ.getSubTotalCarrinho());
      this.service.mostrarMensagem('O pedido mínimo é de R$' + this.service.getDadosEmpresa().pedidomin + ',00 reais');
      return;
    }

    if (!this.service.getDadosUsuario().nome) { this.service.mostrarMensagem('Informe o seu nome'); return; }
    if (!this.service.getDadosUsuario().telefone) {
      this.service.mostrarMensagem('Informe o seu telefone para contato');
      this.telefoneUsu();
      return;
    }

    const cli = {
      imagem: this.service.getDadosUsuario().imagem,
      id: this.service.getDadosUsuario().id,
      nome: this.service.getDadosUsuario().nome,
      telefone: this.service.getDadosUsuario().telefone
    };
    this.bagServ.setCliente(cli);
    this.bagServ.setEmpresaCarrinho(this.service.getDadosEmpresa());
    this.bagServ.setSubtotal(this.bagServ.getSubTotalCarrinho());
    this.bagServ.atualizaTotalComTaxa();
    //  this.bagServ.setDescontoCarrinho(0);
    this.statusbt = true;





    if (this.bagServ.getCarrinho().formapagamento.nome === 'dinheiro' ||
      this.bagServ.getCarrinho().formapagamento.nome === 'Dinheiro') {
      this.bagServ.setTroco(this.form.value.troco);
    }

    this.statusLoaderEnviaPedido = true;

    console.log('Envia para o backend');
    console.log(this.bagServ.getCarrinho());


    this.statusBtenviar = true;
    const accallback = () => {

      console.log('callback');
      this.statusLoaderEnviaPedido = false;
      const r = this.service.getRespostaApi();
      if (r.erro === true) {
        this.service.mostrarMensagem(r.detalhes);
        this.statusBtenviar = false;
      } else {
        this.router.navigate(['/perfil-user/orders']);
        this.service.mostrarMensagem('Pedido finalizado');
        this.bagServ.limparCarrinho();

      }
      console.log(r);
    };
    this.crud.post_api('adicionar_pedido', accallback, this.bagServ.getCarrinho(), true);



  }
  selecionarEndereco() {
    const dialogRef = this.dialog.open(SelectAddressComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onClickPedidoEntrega() {
    if (!this.service.getDadosUsuario().id) { this.openLogin(); return; }
    if (!this.bagServ.getStatusEndereco()) { this.selecionarEndereco(); return; }
    this.bagServ.onclickEntregaTipo();
  }

  selectAddress() {
    const dialogRef = this.dialog.open(FormAddressComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  telefoneUsu() {
    const dialogRef = this.dialog.open(TelefoneUsuarioComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.getDadosUsuario().telefone = result;
      }
    });
  }


}
