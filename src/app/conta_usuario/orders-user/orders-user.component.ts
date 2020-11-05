import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.orders = [
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
    ];
  }

}
