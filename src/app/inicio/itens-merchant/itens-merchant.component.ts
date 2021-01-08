import { FormBuilder, FormGroup } from '@angular/forms';
import { BagService } from './../bag/bag.service';
import { ItemDetailsService } from './../item-details/item-details.service';
import { Router } from '@angular/router';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-itens-merchant',
  templateUrl: './itens-merchant.component.html',
  styleUrls: ['./itens-merchant.component.css']
})
export class ItensMerchantComponent implements OnInit {

  itens: any;

  catalogoFilter: FormGroup;
  constructor(public dialog: MatDialog, public service: ServiceappService, private router: Router, private itemServ: ItemDetailsService,
              private bagServ: BagService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.itens = [
      {nome: 'Nome produto',
      // tslint:disable-next-line: max-line-length
      descricao: 'Descrição do produto ... nome item - descri'
      , preco: 45,
    }, {nome: 'Nome produto',
    // tslint:disable-next-line: max-line-length
    descricao: 'Descrição do produto ... nome item - descri'
    , preco: 45,
  }, {nome: 'Nome produto',
  // tslint:disable-next-line: max-line-length
  descricao: 'Descrição do produto ... nome item - descri'
  , preco: 45,
}
    ];

   // onscroll = this.scrollinput;
    this.service.setStatusBtbag(true);
    this.catalogoFilter = this.fb.group({
      filtro: [''],
    });

    this.catalogoFilter.controls.filtro.valueChanges.subscribe(data => {
      console.log('OK');
    });
  }


  clickMenuCat(item) {
    console.log(this.catalogoFilter.value.filtro);
    this.catalogoFilter.value.filtro = item.id;

    this.service.getDadosEmpresa().categorias.forEach(element => {
      element.selecionado = false;
    });

    item.selecionado = true;
  }

  openItem(item: any) {
    /*const dialogRef = this.dialog.open(ItemDetailsComponent, {
      width: '1000px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });*/
    if (item.esgotado) { this.service.mostrarMensagem('Item indisponível'); return; }
    if (item.esconder) { this.service.mostrarMensagem('Item indisponível'); return; }
    this.itemServ.setItem(item);
    this.router.navigate(['/item-datails']);
  }


  scrollinput() {
    // console.log("evento scroll detectado! " + window.pageXOffset + " " + window.pageYOffset);
    // console.log(window.pageYOffset);
   if (window.pageYOffset > 680) {
       console.log('FIXAA!');
       const element = document.getElementById('item2fix');
       element.classList.add('item2fix');
   } else {
     const element = document.getElementById('item2fix');
     element.classList.remove('item2fix');
     console.log(' NO FIXAA!');
     // this.bagfixo = false;
   }
   // nota: você pode usar window.innerWidth e window.innerHeight para obter a largura e altura da área de visão.
  }

}
