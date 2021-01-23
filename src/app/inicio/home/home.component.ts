import { Router } from '@angular/router';
import { LocaisEnderecoComponent } from './../locais-endereco/locais-endereco.component';
import { RecuperarSenhaComponent } from './../content/recuperar-senha/recuperar-senha.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { SelecionarEnderecoBuscarLojaComponent } from 'src/app/multLojas/selecionar-endereco-buscar-loja/selecionar-endereco-buscar-loja.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  seleionarEndereco(): void {
    const dialogRef = this.dialog.open(SelecionarEnderecoBuscarLojaComponent, {
      width: '590px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === true) {
        this.router.navigate(['lojas']);
      }
    });
  }

}
