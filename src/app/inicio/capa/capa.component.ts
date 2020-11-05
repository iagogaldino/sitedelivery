import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-capa',
  templateUrl: './capa.component.html',
  styleUrls: ['./capa.component.css']
})
export class CapaComponent implements OnInit {
  logo: any;
  constructor(private dialog: MatDialog, public service: ServiceappService) { }

  ngOnInit(): void {
    this.logo = this.service.getDadosEmpresa().imagem;
  }

  onClickBt1() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
