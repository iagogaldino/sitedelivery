import { BagService } from './../../inicio/bag/bag.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {
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
  constructor(private crud: CrudService, private service: ServiceappService, private bsgServ: BagService) { }

  ngOnInit(): void {
    this.cupons();
  }


  cupons() {

    this.crud.get_api('cupons&id_usuario=' + this.service.getDadosUsuario().id).subscribe( data => {
      this.listaCupons = data;
      console.log(this.listaCupons);
    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );
  }

  onClickSemcupom() {
    this.listaCupons.forEach(element => {
      element.selecionado = false;
    });
    this.itemCupom.selecionado = true;
    this.bsgServ.setDescontoCarrinho(0);
    this.bsgServ.setCupomCarrinho({});

    this.service.mostrarMensagem('Sem cupom');

  }

  onClickCupom(item) {

    this.crud.get_api('consulta_cupom&id_usuario=' + this.service.getDadosUsuario().id + '&id_cupom=' + item.id).subscribe( data => {
      this.listaCupons = data.obj;
      if (data.status) {
        this.itemCupom.selecionado = false;
        item.selecionado = true;
        this.bsgServ.setDescontoCarrinho(data.valor);
        this.bsgServ.setCupomCarrinho(data);

      } else { this.service.mostrarMensagem(data.status_texto); }
    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );

    this.listaCupons.forEach(element => {
      if (element.id !== item.id) { element.selecionado = false; }
    });



  }

}
