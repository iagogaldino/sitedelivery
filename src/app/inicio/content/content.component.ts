import { ServiceappService } from 'src/app/service/serviceapp.service';
import { ItemDetailsComponent } from './../item-details/item-details.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  itens: any;


  constructor(public dialog: MatDialog, public service: ServiceappService) { }

  ngOnInit(): void {
    this.itens = [
      {nome: 'Nome produto',
      // tslint:disable-next-line: max-line-length
      descricao: 'Descrição do produto ... nome item - descri'
      , preco: 45,
    },{nome: 'Nome produto',
    // tslint:disable-next-line: max-line-length
    descricao: 'Descrição do produto ... nome item - descri'
    , preco: 45,
  },{nome: 'Nome produto',
  // tslint:disable-next-line: max-line-length
  descricao: 'Descrição do produto ... nome item - descri'
  , preco: 45,
}
    ];



  }



  openItem(item: any) {
    const dialogRef = this.dialog.open(ItemDetailsComponent, {
      width: '1000px',
      data: {item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
