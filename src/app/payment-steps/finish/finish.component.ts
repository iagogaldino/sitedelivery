import { CrudService } from './../../service/crud.service';
import { Router } from '@angular/router';
import { BagService } from './../../inicio/bag/bag.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { AddfpComponent } from './../addfp/addfp.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(public dialog: MatDialog, public service: ServiceappService, public bagServ: BagService,
              private router: Router, private fb: FormBuilder, private crud: CrudService) { }

  ngOnInit(): void {
  }

  addFp(item) {
    if (this.bagServ.getItensCarrinho().length === 0) { this.service.mostrarMensagem('Seu carrinho está vázio. :('); return; }
    if (this.bagServ.verificaFpsTotal() === this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem('O valor total das formas de pagamento já está igual ao valor total do pedido.');
      return;
    }
    const dialogRef = this.dialog.open(AddfpComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



  onClickFinalizarPedido() {
    // console.log(this.form.value);

    console.log(this.bagServ.getCarrinho());
    // Verifica se as formas de pagamento o total esta maior que o valor do pedido em se
    if (this.bagServ.verificaFpsTotal() > this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem('Os valores das formas de pagamento estão maior que o valor total do pedido');
      console.log(this.bagServ.verificaFpsTotal());
      return;
    }



    if (this.bagServ.getQntItensCar() < 1) { this.service.mostrarMensagem('O carrinho está vazio!'); return; }
    if (this.bagServ.verificaFp() === false) {
      this.service.mostrarMensagem('Selecione a forma de pagamento deste pedido');
      return;
    }

    if (this.bagServ.getCarrinho().origempedido === false) {
      this.service.mostrarMensagem('Selecione a origem deste pedido');
      return;
    }

    if (this.bagServ.verificaFpsTotal() !== this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem
        ('Os total da forma de pagamento está menor que o total do pedido.');
      return;
    }

    // Verifica se foi selecionado a bandeira do carão em Cartao Crédito ou Déb.
    const nomeFp = this.bagServ.getCarrinho().formapagamento.nome.toLocaleLowerCase();
    console.log(nomeFp);

    if (this.bagServ.getCarrinho().tipopedido === 'false') {
      this.service.mostrarMensagem('Selecione a opção do pedido, se é para entrega ou para retirada');
      return;
    }
    if (this.form.value.rua === '' || !this.form.value.rua) { this.service.mostrarMensagem('Informe a rua do pedido'); return; }
    if (this.form.value.cidade === false) { this.service.mostrarMensagem('Selecione a cidade do pedido'); return; }
    if (this.form.value.bairro === false) { this.service.mostrarMensagem('Selecione o bairro do pedido'); return; }

    this.bagServ.setCliente(this.service.getDadosEmpresa().id);
    this.bagServ.setIdEmpresaCar(this.service.getDadosEmpresa().id);
    /* if (this.bagServ.getTotalCarrinho() < this.bagServ.getEmpresa().pedidomin) {
       this.alertaDinam('Ops!', 'O pedido mínimo deste estabelecimento é de R$' + this.empServ.getEmpresa().pedidomin + ',00 reais');
       return;
     }*/

    if (!this.form.value.nome) { this.service.mostrarMensagem('Informe o nome do cliente'); return; }
    if (!this.form.value.nome) { this.service.mostrarMensagem('Informe o telefone do cliente'); return; }

    const cli = { imagem: '', id: this.form.value.id, nome: this.form.value.nome, telefone: this.form.value.telefone };
    this.bagServ.setCliente(cli);
    this.bagServ.setEmpresaCarrinho(this.service.getDadosEmpresa());
    this.bagServ.setSubtotal(this.bagServ.getSubTotalCarrinho());
    this.bagServ.getCarrinho().endereco.cidade = this.form.value.cidade;
    this.bagServ.getCarrinho().endereco.bairro = this.form.value.bairro;
    this.bagServ.setItensEndereco(this.form.value);
    this.bagServ.atualizaTotalComTaxa();
    this.bagServ.setDescontoCarrinho(this.form.value.desconto);
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
        this.router.navigate(['/painelpedidos/pedidos']);
        this.service.mostrarMensagem('Pedido finalizado');
        this.bagServ.limparCarrinho();

      }
      console.log(r);
    };
    this.crud.post_api('adicionar_pedido', accallback, this.bagServ.getCarrinho(), true);



  }


}
