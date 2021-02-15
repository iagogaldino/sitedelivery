import { EvaluateOrderComponent } from './../evaluate-order/evaluate-order.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import deepEqual from 'deep-equal';
@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders = [];
  statusLoader = false;
  statusPedidoNoEnd = false;
  constructor(private router: Router, public service: ServiceappService, private crud: CrudService,
              public dialog: MatDialog) {

                const orderTime = setInterval ( () => {
                  this.ordersuser();
                  if (!this.statusPedidoNoEnd) { clearInterval(orderTime); }
                } , 13000);

               }

  ngOnInit(): void {
   this.ordersuser();


  }

  ordersuser() {
    this.crud.get_api('consulta_pedidos&id=' + this.service.getDadosUsuario().id).subscribe( data => {
      this.orders = data.obj;
      this.statusLoader = true;

      try {
      this.orders.forEach(element => {
        if (element.status_pedido === '0' || element.status_pedido === '1' || element.status_pedido === '2') {
          this.statusPedidoNoEnd = true;
        }
      });
       } catch (e) {  }

    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );
  }

  arraysAreIdentical(arr1, arr2) {
    if (arr1.length !== arr2.length) { return false; }
    for (let i = 0, len = arr1.length; i < len; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

  order(item): void {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  avOrder(order: any) {

    const a = () => {
      const r = this.service.getRespostaApi();
      if (r.erro) { this.service.mostrarMensagem(r.detalhes); return; } else {
        /*this.service.mostrarMensagem(r.detalhes);*/
        this.openAvalORder(order);
      }
    };

    this.crud.post_api('status_avaliar', a, { id_pedido: order.id }, false);
  }

  openAvalORder(item: any) {
    const dialogRef = this.dialog.open(EvaluateOrderComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
