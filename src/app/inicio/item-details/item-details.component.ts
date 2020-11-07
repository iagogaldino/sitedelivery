import { BagService } from './../bag/bag.service';
import { Router } from '@angular/router';
import { ItemDetailsService } from './item-details.service';
import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: any;
  statusLoader = false;

  itemCatalogo: {nome: '', imagem: '', descricao: '', categoriaadicional: any, preco: number, total: number, qnt: number
, adicionais: any, observacao: string, preconormal: number};
  statusLoadItem = false;
  imagem =  'no.png';
  statusAdd = false;
  observacaoUsuario: string;

  constructor(private servico: ServiceappService, private crud: CrudService, private itemServ: ItemDetailsService
              /*public dialogRef: MatDialogRef<ItemDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any*/,
              private router: Router, private bagServ: BagService) { }

  ngOnInit(): void {
    if (!this.itemServ.getItem()) { this.router.navigate(['']); return; }
    this.consultaItem();
  }

  consultaItem() {
    // console.log('#consultaEntregas');
    this.crud.get_api('consulta_item&id_item=' +  this.itemServ.getItem().id + '&id_empresa=' +
    this.itemServ.getItem().id_empresa).subscribe(data => {
      // console.log(data);
        this.itemCatalogo = data.item;
        this.itemCatalogo.qnt = 1;
        this.itemCatalogo.total = this.itemCatalogo.preco;
        this.statusLoadItem = true;

        this.itemCatalogo.observacao = ''; // info do cliente
        this.itemCatalogo.adicionais = []; // info do cliente
        if (!this.itemCatalogo.preco) { this.itemCatalogo.preco = 0; }
        this.itemCatalogo.preconormal = this.itemCatalogo.preco; // preco do item mesmo com as alteracoes de valores do usuario
        this.itemCatalogo.total = this.itemCatalogo.preco;
        this.statusLoader = true;
    });
  }

  onclickAltQntADD() {
    console.log('onclickAltQntADD');
    this.itemCatalogo.qnt += 1;
    let res = 0;
    res = this.itemCatalogo.preco + this.getTotalAdicionais();
    res = res * this.itemCatalogo.qnt;
    this.itemCatalogo.total = res;
  }
  onclickAltQntSUB() {
    if (this.itemCatalogo.qnt === 1) { return; }
    this.itemCatalogo.qnt -= 1;
    let res = 0;
    res = this.itemCatalogo.preco + this.getTotalAdicionais();
    this.itemCatalogo.total = res * this.itemCatalogo.qnt;
  }
  onclickAddAdc(item: any, categoria: any) {


    const categoriaItem = this.procuraItemArray(this.itemCatalogo.categoriaadicional, categoria, 'id');
    const itemarray = this.procuraItemArray(this.itemCatalogo.adicionais, item, 'id');

    if (categoriaItem.qntadd === categoria.maxsele && categoria.maxsele !== 0) {
      console.warn('O máximo geral itens dessa categoria já foi adicionado.');
     // ons.notification.toast('Você já adicionou a quantidade máxima de adicionais.', {timeout: 2000});
      this.servico.mostrarMensagem('Você já adicionou a quantidade máxima de adicionais.');
      return;
    }
    if (itemarray === false) {
      // adiciona o item quando ele não existe na array de adicionais
      item.qnt = 1;
      if (!categoria.qntadd) { categoriaItem.qntadd = 1; } else { categoriaItem.qntadd++; }
     //  categoria.qntadd = 1;

      this.itemCatalogo.adicionais.push(item);
    } else {
      // Verifica  a quantidade de itens que pode adicionar para esta cat
      if (itemarray.qnt === categoriaItem.qnt_adc_item) {
        console.warn('O máximo itens dessa categoria já foi adicionado.');
       // ons.notification.toast(`Você só pode adicionar até ${categoriaItem.qnt_adc_item} desta categoria`, {timeout: 2000});
        this.servico.mostrarMensagem(`Você só pode adicionar até ${categoriaItem.qnt_adc_item} desta categoria`);
        return; }
      itemarray.qnt ++;
      categoriaItem.qntadd ++;

    }

    // Se o adicional for da categoria de PREVALECER por MAIOR PRECO nao soma os preço,
    // mas verifica qual o adicional mais caro esta selecionado
    console.log(categoriaItem);
    if (categoriaItem.prevalecer_preco) {
      // Verifica na lista de adicionais adicionao que tem o preço maior
      this.itemCatalogo.adicionais.forEach(element => {
        if (item.preco > element.preco && item.preco > this.itemCatalogo.total) {
          this.itemCatalogo.total = item.preco;
        // tslint:disable-next-line: radix
        } else {  if ( this.itemCatalogo.total === 0) {  this.itemCatalogo.total = item.preco; } }
      });
    } else {
      this.itemCatalogo.total += item.preco;
    }

  }

  vericaCatObrigatorio() {
    let status = false;
    let qntt = 0;
    const itensErro = [];

    try {

      this.itemCatalogo.categoriaadicional.forEach(element => {
        if (element.obrigatorio === true) {
          // esta categoria é obrigatoria
          // verifica se o usuario ja adicionou alguma
          if (element.qntadd && element.qntadd > 0) {
            // console.log('Categoria OK');
            // console.log(element);
          } else {
            // console.error('Categoria ERRO =>');
            itensErro.push(element);
            qntt++;
          }
        }
      });
    } catch (e) { qntt = 0; }

    if (qntt > 0) { status = true; } else { status = false; }

    const resultado = {
      status,
      itensErro,
      qntt
    };

    return resultado;

  }


  onclickRemoveAdc(item: any, categoria: any) {
    if (item.qnt === 0) { return; }
    const categoriaItem = this.procuraItemArray(this.itemCatalogo.categoriaadicional, categoria, 'id');
    const itemarray = this.procuraItemArray(this.itemCatalogo.adicionais, item, 'id');
    itemarray.qnt --;
    categoriaItem.qntadd --;
    // this.itemCatalogo.total -= item.preco;

    // remove o item da array
    for (const x in this.itemCatalogo.adicionais) {
      if (this.itemCatalogo.adicionais[x] === itemarray && itemarray.qnt === 0) {
        // console.log('Remove este item!');
        this.itemCatalogo.adicionais.splice(x, 1); // remove do array
      }
    }

     // Verifica os precos dos adicionais
    if (categoriaItem.prevalecer_preco) {
      let adicionaPreco = 0;
      this.itemCatalogo.adicionais.forEach(element => {
        if (element.preco > adicionaPreco) { adicionaPreco = element.preco; }
      });
      this.itemCatalogo.total = adicionaPreco;
    } else {
      this.itemCatalogo.total -= item.preco;
    }

  }

  onclickAddCar(obs) {
    if (this.statusAdd === true) { return; }


    const x = this.vericaCatObrigatorio();
    if (x.status === true) {
      this.servico.mostrarMensagem('Verifique os itens que são obrigatórios');
      return;
    }
    this.statusAdd = true;
    this.itemCatalogo.observacao = obs;
    // console.log(this.item);
    const r = this.bagServ.addItemCarrinho(this.itemCatalogo);
    if (r) {
      this.servico.mostrarMensagem('Item adicionado ao carrinho!');
      this.router.navigate(['']);
  }
    setTimeout( () => { this.statusAdd = false; }, 800 );
  }

  procuraItemArray(array: any, itemprocurar: any, nomeindexarray: string): any {
    try {
      let itemretorno = false;
      array.forEach( (element, key) => {
        if (element.id === itemprocurar[nomeindexarray]) {  element.indexkey = key; itemretorno = element;  }
      });
      return itemretorno;
    } catch (e) { console.log('Item não encontrado na array...'); }
  }

  getTotalAdicionais(): number {
    let total = 0;
    this.itemCatalogo.adicionais.forEach(element => {
      console.log(element);
      total += element.preco;
    });
    return total;
  }

}