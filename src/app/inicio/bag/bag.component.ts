import { CuponsListComponent } from './../../payment-steps/cupons-list/cupons-list.component';

import { ServiceappService } from './../../service/serviceapp.service';
import { BagService } from './bag.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CuponsComponent } from 'src/app/payment-steps/cupons/cupons.component';

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
     // console.log("evento scroll detectado! " + window.pageXOffset + " " + window.pageYOffset);
     // console.log(window.pageYOffset);
    if (window.pageYOffset > 70) {
       // console.log('FIXAA!');
       const element = document.getElementById('contentbag');
       element.classList.add('bagfixo');
    } else {
      const element = document.getElementById('contentbag');
      element.classList.remove('bagfixo');
      // console.log(' NO FIXAA!');
      // this.bagfixo = false;
    }
    // nota: você pode usar window.innerWidth e window.innerHeight para obter a largura e altura da área de visão.
   }

   onClickBtCar() {
     this.router.navigate(['./finish']);
   }

}
