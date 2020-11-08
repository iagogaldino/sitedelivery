import { RegrasCupomComponent } from './regras-cupom/regras-cupom.component';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {

  itens: Array<any>;

  constructor(private service: ServiceappService, private crud: CrudService, public dialog: MatDialog) { }

  ngOnInit(): void {
 this.cupons();
  }

  cupons() {
    this.crud.get_api('cupons&id_usuario=' + this.service.getDadosUsuario().id).subscribe( data => {
       this.itens = data;
    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );
  }

  openCupom(item): void {
    const dialogRef = this.dialog.open(RegrasCupomComponent, {
      width: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
