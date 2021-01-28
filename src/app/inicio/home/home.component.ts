import { LojasService } from './../../multLojas/lojas/lojas.service';
import { Router } from '@angular/router';
import { LocaisEnderecoComponent } from './../locais-endereco/locais-endereco.component';
import { RecuperarSenhaComponent } from './../content/recuperar-senha/recuperar-senha.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { SelecionarEnderecoBuscarLojaComponent } from 'src/app/multLojas/selecionar-endereco-buscar-loja/selecionar-endereco-buscar-loja.component';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  configApp: any;
  constructor(private lojaServ: LojasService, private dialog: MatDialog, private router: Router, private servico: ServiceappService, private crud: CrudService) { }

  ngOnInit(): void {
  }

  seleionarEndereco(): void {
    const dialogRef = this.dialog.open(SelecionarEnderecoBuscarLojaComponent, {
      width: '590px',
      data: this.configApp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['lojas']);
      }
      if (result === 'entrar') {
        this.router.navigate(['/entrar']);
      }
    });
  }


}
