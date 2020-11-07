import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {

  tittle: string;

  constructor(private router: Router, public service: ServiceappService, private crud: CrudService) {
    // Se não existir dados do usuário - direciona para página inicio]
    if (!this.service.getDadosUsuario().id) { this.router.navigate(['']); }
   }

  ngOnInit(): void {

  }

  onClickMenu(rota: string, tittle: string) {
    this.tittle = tittle;
    this.router.navigate([rota]);
  }



}
