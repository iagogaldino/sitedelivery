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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickMenu(rota: string, tittle: string) {
    this.tittle = tittle;
    this.router.navigate([rota]);
  }

}
