import { LoginComponent } from './../login/login.component';
import { Router } from '@angular/router';
import { BagComponent } from './../bag/bag.component';
import { BagService } from './../bag/bag.service';
import { SelectAddressComponent } from './../select-address/select-address.component';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-capa',
  templateUrl: './capa.component.html',
  styleUrls: ['./capa.component.css']
})
export class CapaComponent implements OnInit {
  logo: any;
  statusShow = true;
  constructor(private dialog: MatDialog, public service: ServiceappService, public bagServ: BagService, private router: Router) { }

  ngOnInit(): void {
    this.logo = this.service.getDadosEmpresa().imagem;
    this.router.events.subscribe((val) => {
      // see also
      const a = this.router.url.split('/');
      if (a[0] === 'item-datails' || a[1] === 'item-datails' || a[2] === 'item-datails') {
        if (window.innerWidth < 600) {
        this.statusShow = false;
        }
      } else {
        this.statusShow = true;
      }

  });
  }

  onClickBt1() {
    if (this.service.getDadosUsuario().id) {
      this.router.navigate(['/perfil-user/orders']);
      return;
     }
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {router: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  selectAddress() {

    const dialogRef = this.dialog.open(SelectAddressComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openLogin() {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
      data: {}
    });

  }

  /*openBag() {
    const dialogRef = this.dialog.open(BagComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }*/

  openBag() {
    this.service.setStatusBtbag(true);
    this.router.navigate(['bag']);
  }


}
