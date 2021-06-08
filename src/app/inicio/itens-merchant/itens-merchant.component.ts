import { SelectAddressComponent } from './../select-address/select-address.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BagService } from './../bag/bag.service';
import { ItemDetailsService } from './../item-details/item-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;

@Component({
  selector: 'app-itens-merchant',
  templateUrl: './itens-merchant.component.html',
  styleUrls: ['./itens-merchant.component.css']
})
export class ItensMerchantComponent implements OnInit {

  itens: any;
  categoriasProdutos = [{id: 0, nome: false, selecionado: false, itens: [{}, {}, {}, {}]}];
  catalogoFilter: FormGroup;
  formProd: FormGroup;

  constructor(public dialog: MatDialog, public service: ServiceappService, private router: Router, private itemServ: ItemDetailsService,
              public bagServ: BagService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.setStatusBtbag(true);
    this.catalogoFilter = this.fb.group({
      filtro: [''],
    });

    this.formProd = this.fb.group({
      filtro: [''],
    });


    this.catalogoFilter.controls.filtro.valueChanges.subscribe(data => {
      console.log('OK');
    });


  }


  clickMenuCat(item) {
    console.log(this.catalogoFilter.value.filtro);
    // this.catalogoFilter.value.filtro = item.id;

    this.service.getDadosEmpresa().categorias.forEach(element => {
      element.selecionado = false;
    });

    item.selecionado = true;

   /* this.formProd.controls.filtro.valueChanges.subscribe(data => {
      console.log(data);
    });
    */
    this.irCategoria(item.id);
  }

  openItem(item: any) {

    if (!item.id) { return; }
    // if (this.service.getDadosEmpresa().status_delivery === false) { this.service.mostrarMensagem('Estabelecimento fechado'); return; }
    // if (item.esgotado) { this.service.mostrarMensagem('Item indisponível'); return; }
    // if (item.esconder) { this.service.mostrarMensagem('Item indisponível'); return; }
    // this.itemServ.setItem(item);
    this.router.navigate(['/item-datails/' + item.id]);
  }

  openBag() {
    this.service.setStatusBtbag(true);
    this.router.navigate(['bag']);
  }

  selectAddress() {

    const dialogRef = this.dialog.open(SelectAddressComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  irCategoria(id: string) {
    const href = $('#cat_id_' + id);
    $('html, body').animate({
      scrollTop: $(href).offset().top - 120
    }, 500);
  }

}
