import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avals',
  templateUrl: './avals.component.html',
  styleUrls: ['./avals.component.css']
})
export class AvalsComponent implements OnInit {
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
