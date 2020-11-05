import { LocaisEnderecoComponent } from './../locais-endereco/locais-endereco.component';
import { RecuperarSenhaComponent } from './../content/recuperar-senha/recuperar-senha.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  recSenha() {
    const dialogRef = this.dialog.open(RecuperarSenhaComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  selecionarEndereco() {
    const dialogRef = this.dialog.open(LocaisEnderecoComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
