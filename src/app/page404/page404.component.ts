import { LojasService } from 'src/app/multLojas/lojas/lojas.service';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(private servico: ServiceappService, private router: Router, private crud: CrudService, private cookies: CookieService,
              private lojasServ: LojasService) {
    console.log(this.router.url);
    if (this.servico.sistemMultStores) {
    const ur = this.router.url.replace('/', '');
    this.servico.perfilEmpresa = true;
    this.cookies.set('tag_empresa', ur);
    this.crud.getIdEmpresaNome(ur);
    } else {
      this.showImagem = true;
      this.servico.perfilEmpresa = false;
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
