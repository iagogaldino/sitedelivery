import { ServiceappService } from './../../service/serviceapp.service';
import { BagService } from './bag.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {
  @Input() autofix: boolean;
  @Input() showBtF: boolean;
  itens: Array<any>;


  constructor(public servbag: BagService, private router: Router, public service: ServiceappService) { }

  ngOnInit(): void {
    const a = false;
    if (this.autofix) {
     onscroll = this.scroll;
    }
    this.itens = [
      {n: ''},

    ];
  }


  scroll() {
     // console.log("evento scroll detectado! " + window.pageXOffset + " " + window.pageYOffset);
     // console.log(window.pageYOffset);
    if (window.pageYOffset > 90) {
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
