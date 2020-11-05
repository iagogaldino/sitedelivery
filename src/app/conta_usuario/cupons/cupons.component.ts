import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {

  itens: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.itens = [
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
      {nome: ''},
      {nome: ''},
      {nome: ''},
    ];
  }

}
