import { BagService } from './../../inicio/bag/bag.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CrudService } from 'src/app/service/crud.service';
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
  statusLoader = false;



  constructor(public dialog: MatDialog,
              public servico: ServiceappService,
              private crud: CrudService,
              private router: Router,
              private bagServ: BagService) { }

  ngOnInit(): void {

    this.itens = [
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
    ];

    this.lojas = [
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
    ];

    this.destaques = [
      { imagem: '',
      nome: 'Lanches' },
      { imagem: '', nome: 'Lanches' },
      { imagem: '', nome: 'Lanches' },
    ];


    setTimeout(() => {

    this.carregaConfig();

     }, 1900);

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

  carregaConfig() {
    this.statusLoader =  true;
    if (this.servico.getEmpresas()) {
      this.lojas = this.servico.getEmpresas();
    } else {
      this.router.navigate(['/buscar-lojas']);
    }
    console.log(this.servico.getCategoriasEmpresa());
    if (this.servico.getCategoriasEmpresa()) {
      // this.itens = this.servico.getCategoriasEmpresa();
    }
    console.log(this.servico.getDestaques());
    if (this.servico.getDestaques()) {
      // this.destaques = this.servico.getDestaques();
    }
  }

  verEmpresa(item: any): void {
    console.log(item);
    this.bagServ.limparCarrinho();
    this.servico.setIdEmpresa(item.id);
    this.router.navigate(['/']);
  }

}

