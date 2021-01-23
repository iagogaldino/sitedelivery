import { ServiceappService } from './../../service/serviceapp.service';
import { SelecionarEnderecoBuscarLojaComponent } from './../selecionar-endereco-buscar-loja/selecionar-endereco-buscar-loja.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  itens: Array<any>;
  lojas: Array<any>;
  destaques: Array<any>;


  constructor(public dialog: MatDialog, public servico: ServiceappService) { }

  ngOnInit(): void {

    this.itens = [
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
    ];

    this.lojas = [
      {imagem: '', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Carnes-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Carnes-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Carnes-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Carnes-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Lanches-out_20.jpg', nome: 'Lanches'},
      {imagem: 'https://static-images.ifood.com.br/image/upload/t_low/discoveries/Carnes-out_20.jpg', nome: 'Lanches'},
    ];

    this.destaques = [
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
      {imagem: '', nome: 'Lanches'},
    ];


  }

  seleionarEndereco(): void {
    const dialogRef = this.dialog.open(SelecionarEnderecoBuscarLojaComponent, {
      width: '590px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

