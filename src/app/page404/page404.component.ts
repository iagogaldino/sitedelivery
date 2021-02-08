import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  showImagem = false;
  constructor(private servico: ServiceappService, private router: Router, private crud: CrudService) {
    console.log(this.router.url);
    if (this.servico.sistemMultStores) {

     this.crud.getIdEmpresaNome(this.router.url.replace('/', ''));
    } else {
      this.showImagem = true;
    }
   }

  ngOnInit(): void {
    console.log(this.servico.getIdEmpresa() );
    if (this.servico.sistemMultStores) {
      this.router.navigate(['']);
    }
  }
  inicio() {
    if (this.servico.sistemMultStores) {
      this.router.navigate(['/lojas']);
    } else {
      this.router.navigate(['']);
    }
  }
}
