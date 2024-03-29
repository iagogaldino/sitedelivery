import { CrudService } from 'src/app/service/crud.service';
import { CookieService } from 'ngx-cookie-service';
import { BagService } from './../bag/bag.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormAddressComponent } from 'src/app/conta_usuario/adresses/form-address/form-address.component';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {

  myControl: FormGroup;
  myControl2 = new FormControl();
  options = this.service.getDadosEmpresa().locais_entrega;
  neighborhoods: Array<any>;
  neighborhoodsSelected = {nome: '', taxa: 0, id: 0};
  statusCity = false;
  citySelected = {nome: '', id: 0, bairros: []};

  constructor(public service: ServiceappService,  public dialogRef: MatDialogRef<SelectAddressComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private bagServ: BagService, private dialog: MatDialog,
              private cookies: CookieService, private crud: CrudService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myControl = this.fb.group({
      filtroBairro: [''],
    });

  }

  selectCity(item: any) {
    console.log(item);
    this.statusCity = true;
    this.neighborhoods = item.bairros;
    this.citySelected = item;
  }
  selectNeigh(item: any) {
    this.neighborhoodsSelected = item;
  }

  setAddress() {

    if (!this.citySelected.nome || this.citySelected.nome === '') {  this.service.mostrarMensagem('Selecione sua cidade'); return; }
    if (!this.neighborhoodsSelected.nome || this.neighborhoodsSelected.nome === '') {
      this.service.mostrarMensagem('Selecione seu bairro');
      return;
    }

    this.bagServ.setCidadeEnderecoEntrega(this.citySelected);
    this.bagServ.setBairroEnderecoEntrega(this.neighborhoodsSelected);
    this.bagServ.setTaxaEntrega(this.neighborhoodsSelected.taxa, false);
    // Se o usuário digitar o nome errado do bairro, o sistema corrige auto.
    this.service.getDadosEmpresa().locais_entrega.forEach(element => {
      if (element.id === this.citySelected.id) {
        this.citySelected.nome = element.nome;
        this.citySelected.bairros.forEach(bairro => {
          if (bairro.id === this.neighborhoodsSelected.id) {
            this.neighborhoodsSelected.nome = bairro.nome;          }
        });
      }
    });

    setTimeout( () => { this.dialogRef.close();  } , 300);
  }

  selectItemAddressuser(item: any) {
    // console.log(item);
    const addresString  = JSON.stringify(item);
    // console.log(addresString);
    // this.cookies.set('address_user', addresString);
    sessionStorage.setItem('address_user', addresString);
    this.bagServ.setEnderecoEntrega(item);
    this.bagServ.setTipoPedido('entrega');
    setTimeout ( () => { this.dialogRef.close(); }  , 200 );
    /*setTimeout ( () => { this.service.mostrarMensagem('Endereço selecionado'); }  , 600 );*/
  }

  selectAddress() {
    this.dialog.closeAll();
    setTimeout( () => {

      const dialogRef = this.dialog.open(FormAddressComponent, {
        width: '550px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
      });


     } , 500 );

  }


}
