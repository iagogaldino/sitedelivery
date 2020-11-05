import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit {

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
      {nome: ''},
      {nome: ''},
      {nome: ''},
      {nome: ''},
    ];
  }

}
