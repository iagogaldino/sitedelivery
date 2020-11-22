import { BagService } from './../../inicio/bag/bag.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-addfp',
  templateUrl: './addfp.component.html',
  styleUrls: ['./addfp.component.css']
})
export class AddfpComponent implements OnInit {

  form: FormGroup;
  statusBt = false;

  constructor(public service: ServiceappService, public bagServ: BagService,
              public dialogRef: MatDialogRef<AddfpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private crud: CrudService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      valor: [''],
      troco: [''],
    });
  }

  onClickConfirm(item) {
    if (this.bagServ.getItensCarrinho().length === 0) { this.service.mostrarMensagem('Seu carrinho está vázio. :('); return; }
    if (!this.form.value.valor || this.form.value.valor === '') { this.service.mostrarMensagem('Informe o valor'); return; }

    if (parseFloat(this.form.value.valor) + this.bagServ.verificaFpsTotal() > this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem('Você informou o valor maior que o total do pedido');
      return;
    }
    // calcular o total de fps
    if (this.form.value.valor > this.bagServ.getTotalCarrinho()) {
      this.service.mostrarMensagem('Ops..! Você informou o valor do pagamento maior que o valor total do pedido'); return;
    }
    let statusItemSelecionado = false;
    if (item.itens) {
      item.itens.forEach(element => {
        if (element.selecionado === true) {
          item.itemSelecionado = element;
          statusItemSelecionado = true;
        }
      });
      if (!statusItemSelecionado) { this.service.mostrarMensagem('Selecione o item de pagamento'); return; }
    }

    item.valor = this.form.value.valor;
    if (this.form.value.troco > 0) {
     item.troco = this.form.value.troco;
     if ( parseFloat( this.form.value.troco ) < parseFloat( this.form.value.valor ) ) {
      this.service.mostrarMensagem('Você vai precisar de troco para quanto?');
      return;
     }
    }

    console.log(item);


    this.consultaItemFp(item);

  }

  consultaItemFp(item) {
    this.statusBt = true;
    const a = () => {
      const r = this.service.getRespostaApi();

      if (r.erro) {
        // this.service.mostrarMensagem(r.detalhes);
        this.statusBt = false;
      }

      item.descricao = r.resultado.descricao;
      item.banco = r.resultado.nome;
      item.conta = r.resultado.conta;
      item.operacao = r.resultado.operacao;
      this.bagServ.addFp(item);
      this.dialogRef.close();
    };
    try {
    this.crud.post_api('consultaItemFP', a, item.itemSelecionado.id, false);
  } catch (e) {

    this.bagServ.addFp(item);
    this.dialogRef.close();

   }
  }

  itensFp(item: any, itempay) {
    console.log(item);
    let cont = 0;
    let indexArray = 0;

    this.data.itens.forEach(element => {
      element.selecionado = false;
    });

    this.data.itens.forEach(element => {
      if (element.id === itempay.id) {
        indexArray = cont;
      }
      cont++;
    });
    setTimeout(() => { this.data.itens[indexArray].selecionado = true; }, 100);
  }

}
