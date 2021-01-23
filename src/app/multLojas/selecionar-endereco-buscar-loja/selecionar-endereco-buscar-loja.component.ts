import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-endereco-buscar-loja',
  templateUrl: './selecionar-endereco-buscar-loja.component.html',
  styleUrls: ['./selecionar-endereco-buscar-loja.component.css']
})
export class SelecionarEnderecoBuscarLojaComponent implements OnInit {

  cidades: Array<any>;
  bairros: Array<any>;
  tipoCaixa = 1;
  statusLoader = false;
  statusLoaderLojas = false;
  constructor( public dialogRef: MatDialogRef<SelecionarEnderecoBuscarLojaComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.cidades = [
      {nome: 'Juazeiro'},
      {nome: 'Petrolina'},
    ];

    this.bairros = [
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Alto da maravilaassdasd  asdasdasdasdas'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
      {nome: 'Coreia'},
      {nome: 'Alto da maravilaa'},
    ];


  }

  onclickBack() {
    this.tipoCaixa = 1;
  }

  clickSelecionarCidade(item) {
    this.tipoCaixa = 2;
  }
  onvlickSelecionarBairro(item) {
    this.statusLoaderLojas = true;
    this.dialogRef.close(true);
  }

}
