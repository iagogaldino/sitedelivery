import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders: Array<any>;

  constructor(private router: Router, public service: ServiceappService, private crud: CrudService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
   this.ordersuser();
  }

  ordersuser() {
    this.crud.get_api('consulta_pedidos&id=' + this.service.getDadosUsuario().id).subscribe( data => {
      this.orders = data.obj;
    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );
  }

  order(item): void {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '550px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
