import { CuponsListComponent } from './../../payment-steps/cupons-list/cupons-list.component';

import { ServiceappService } from './../../service/serviceapp.service';
import { BagService } from './bag.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CuponsComponent } from 'src/app/payment-steps/cupons/cupons.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {
  @Input() autofix: boolean;
  @Input() showBtF: boolean;
  itens: Array<any>;


  constructor(public servbag: BagService, private router: Router, public service: ServiceappService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    const a = false;
    if (this.autofix) {
     onscroll = this.scroll;
    }
    this.itens = [
      {n: ''},

    ];
    onscroll = this.scroll;
  }

  cupons(): void {
    if (!this.service.getDadosUsuario().id) { this.service.mostrarMensagem('Entre com sua conta para acessar seus cupons'); return; }
    const dialogRef = this.dialog.open(CuponsListComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  scroll() {
     // console.log(window.pageYOffset);
     if (window.pageYOffset > 70) {
        // console.log(' BAG FIXAA!');
        const element = document.getElementById('contentbag');
        element.classList.add('bagfixo');
    } else {
      const element = document.getElementById('contentbag');
      element.classList.remove('bagfixo');
      // console.log(' BAg NO FIXAA!');
      // this.bagfixo = false;
    }

     if (window.pageYOffset > 680) {
      // console.log('FIXAA!');
      const element = document.getElementById('item2fix');
      element.classList.add('item2fix');
  } else {
    const element = document.getElementById('item2fix');
    element.classList.remove('item2fix');
    // console.log(' NO FIXAA!');
    // this.bagfixo = false;
  }
    // nota: você pode usar window.innerWidth e window.innerHeight para obter a largura e altura da área de visão.
   }

   onClickBtCar() {
     if (!this.service.getDadosUsuario().id) { this.onClickBt1(); return; }
     this.router.navigate(['./finish']);
   }

   onClickBt1() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {router: false, routerName: './finish'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  onclickAltQntADD(item) {
    console.log('onclickAltQntADD');
    item.qnt += 1;
    let res = 0;
    // res = item.preco + this.getTotalAdicionais();
    res = item.preco * item.qnt;
    item.total = res;
  }
  onclickAltQntSUB(item) {
    if (item.qnt === 1) { return; }
    item.qnt -= 1;
    let res = 0;
    // res = item.preco + this.getTotalAdicionais();
    item.total = item.preco * item.qnt;
  }


}
