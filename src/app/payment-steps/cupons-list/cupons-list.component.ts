import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BagService } from 'src/app/inicio/bag/bag.service';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-cupons-list',
  templateUrl: './cupons-list.component.html',
  styleUrls: ['./cupons-list.component.css']
})
export class CuponsListComponent implements OnInit {

  listaCupons: Array<any>;
  itemCupom = {
    titulo: 'Sem cupom',
    status: true,
    selecionado: false,
    valor: 0,
    regras: false,
    texto: false,
    datafim: false
  };
  constructor(private crud: CrudService, private service: ServiceappService, private bsgServ: BagService,
              public dialogRef: MatDialogRef<CuponsListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cupons();
  }


  cupons() {

    this.crud.get_api('cupons&id_usuario=' + this.service.getDadosUsuario().id).subscribe(data => {
      this.listaCupons = data;
      console.log(this.listaCupons);
    }, error => { this.service.mostrarMensagem('Ocorreu um erro inesperado'); });
  }

  onClickSemcupom() {
    this.listaCupons.forEach(element => {
      element.selecionado = false;
    });
    this.itemCupom.selecionado = true;
    this.bsgServ.setDescontoCarrinho(0);
    this.bsgServ.setCupomCarrinho({});

    this.service.mostrarMensagem('Sem cupom');

    setTimeout( () => {
      this.dialogRef.close();
    } , 500 );

  }

  onClickCupom(item) {

    this.crud.get_api('consulta_cupom&id_usuario=' + this.service.getDadosUsuario().id + '&id_cupom=' + item.id).subscribe(data => {
      // this.listaCupons = data;
      if (data.status) {
        this.itemCupom.selecionado = false;
        item.selecionado = true;
        this.bsgServ.setDescontoCarrinho(data.valor);
        this.bsgServ.setCupomCarrinho(data);
        this.service.mostrarMensagem('Cupom selecionado');
      } else { this.service.mostrarMensagem(data.status_texto); }
    }, error => { this.service.mostrarMensagem('Ocorreu um erro inesperado'); });

    this.listaCupons.forEach(element => {
      if (element.id !== item.id) { element.selecionado = false; }
    });

    setTimeout( () => {
      this.dialogRef.close();
    } , 500 );

  }

}

