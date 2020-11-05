import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {

  itens: any;

  constructor() { }

  ngOnInit(): void {
    this.itens = [
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
      {nome: '', nota: '', avaliacao: '', resposta: ''},
    ];
  }

}
