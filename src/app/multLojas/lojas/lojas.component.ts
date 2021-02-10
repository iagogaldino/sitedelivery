import { CookieService } from 'ngx-cookie-service';
import { LojasService } from './lojas.service';
import { BagService } from './../../inicio/bag/bag.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { SelecionarEnderecoBuscarLojaComponent } from './../selecionar-endereco-buscar-loja/selecionar-endereco-buscar-loja.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/inicio/login/login.service';
declare var $: any;
@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css']
})
export class LojasComponent implements OnInit {

  itens: Array<any>;
  lojas: Array<any>;
  lojasFiltradas: Array<any>;
  lojasFiltradasTags: Array<any>;
  destaques: Array<any>;
  statusLoader = false;
  form: FormGroup;
  caixaItens = true;
  caixaDestaques = true;
  arrowStatusLojas = true;
  filtro: string;
  filtro2: string;
  arrowNextLojas: any;
  arrowPrevtLojas: any;
  mostrarLojasFiltradas = false;
  cidade: any;
  bairro: any;
  descGuinho = '';
  heightCarrou = 200;

  constructor(public dialog: MatDialog,
              public servico: ServiceappService,
              private crud: CrudService,
              private router: Router,
              private bagServ: BagService,
              private fb: FormBuilder,
              public lojasServ: LojasService,
              private lojaServ: LojasService,
              private cookie: CookieService,
              private loginServ: LoginService) {

                this.loginServ.loginPorCOOKIES();

              }

  ngOnInit(): void {

    this.cidade = this.lojasServ.getEnderecoSelecionado().ci.nome;
    this.bairro = this.lojasServ.getEnderecoSelecionado().ba.nome;

    this.form = this.fb.group({
      filtroEmpresa: [''],
    });

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
    ];

    this.lojasFiltradas = [
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
    ];

    this.destaques = [
      {
        imagem: '',
        nome: 'Lanches'
      },
      { imagem: '', nome: 'Lanches' },
      { imagem: '', nome: 'Lanches' },
    ];

    this.lojas = [
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
      { imagem: false },
    ];

    if (!this.servico.sistemMultStores) {
      this.router.navigate(['/404']);
      return;
    }

    setTimeout(() => {

      this.carregaConfig();

    }, 1900);

    this.form.controls.filtroEmpresa.valueChanges.subscribe(data => {
      if (data) { this.filtrarLojas(true, false, false, true); } else { this.filtrarLojas(false, true, true, true); }
    });



  }

  seleionarEndereco(): void {
    const dialogRef = this.dialog.open(SelecionarEnderecoBuscarLojaComponent, {
      width: '590px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cidade = this.lojasServ.getEnderecoSelecionado().ci.nome;
        this.bairro = this.lojasServ.getEnderecoSelecionado().ba.nome;
        this.carregaConfig();
      } else {
        if (result === 'entrar') { this.router.navigate(['/entrar']); } else {
          if (!this.servico.getEmpresas()) {
          this.router.navigate(['/buscar-lojas']);
          }
        }
      }
    });
  }

  carregaConfig() {

    if (this.servico.getEmpresas()) {
      this.statusLoader = true;
      this.lojas = this.servico.getEmpresas();
      const e = JSON.stringify(this.lojaServ.getEnderecoSelecionado());
      this.cookie.set('dels', 'xxx01');
      this.cookie.set('endereco', e);
      this.heightCarrou = Math.trunc(this.servico.getEmpresas().length / 3) * 410;
    } else {
      this.seleionarEndereco();
      // this.router.navigate(['/buscar-lojas']);
    }
    if (this.servico.getCategoriasEmpresa()) {
      // this.itens = this.servico.getCategoriasEmpresa();
    }
    if (this.servico.getDestaques()) {
      // this.destaques = this.servico.getDestaques();
    }
    try {
      this.arrowNextLojas = $('.carousel-arrow-next')[2];
      this.arrowPrevtLojas = $('.carousel-arrow-prev')[2];
      this.arrowNextLojas.classList.add('arrowLojasNext');
      this.arrowPrevtLojas.classList.add('arrowLojasPrev');

      $('.arrowLojasPrev').css('display', 'none');
      $('.arrowLojasNext').css('display', 'none');
    } catch (e) { console.log('...'); }
  }

  onClickCancelFilterTag() {
    this.filtro = '';
    this.lojas = this.servico.getEmpresas();
    this.mostrarLojasFiltradas = false;
    this.caixaItens = true;
    this.caixaDestaques = true;
  }

  filtrarLojas(status: boolean, mostrarDestaques: boolean, mostrarItens: boolean, getEmpresas: boolean) {
    if (status) {
      this.caixaItens = mostrarItens;
      this.caixaDestaques = mostrarDestaques;
      // this.arrowStatusLojas = true;
      this.mostrarLojasFiltradas = true;
      setTimeout(() => {
        $('.arrowLojasNext').click();
      }, 500);
      if (getEmpresas) {
        setTimeout(() => {
          this.lojasFiltradas = this.servico.getEmpresas();
        }, 700);
      }

    } else {
      this.caixaItens = mostrarItens;
      this.caixaDestaques = mostrarDestaques;
      $('.arrowLojasPrev').click();
      setTimeout(() => {
        this.mostrarLojasFiltradas = false;
        // this.arrowStatusLojas = false;
      }, 500);

    }
  }

  verEmpresa(item: any): void {
    this.bagServ.limparCarrinho();
    this.servico.setIdEmpresa(item.id);
    this.router.navigate(['/']);
  }

  filtroPorItens(item: any): void {
    this.lojasFiltradasTags = [];
    this.lojas = [
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
    this.filtro = item.tag;
    this.servico.getEmpresas().forEach(element => {

      element.tags.forEach(element2 => {
        if (item.tag === element2) {
          this.lojasFiltradasTags.push(element);
        }

      });

    });
    this.mostrarLojasFiltradas = false;
    this.caixaItens = true;
    this.caixaDestaques = false;

    setTimeout(() => {
      this.lojas = this.lojasFiltradasTags;
    }, 1400);
  }

  consultaEmpresas(item: any) {
    this.lojas = [
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
    const fun = () => {
      const res = this.servico.getRespostaApi();
      if (res.erro === true) { console.error(res.erro); }
      this.lojas = res.empresas;
      this.servico.descLoader = res.detalhes;
    };
    const params = { cidade: this.lojasServ.getEnderecoSelecionado().ci, bairro: this.lojasServ.getEnderecoSelecionado().ba };
    this.crud.post_api('empresas-local-destaque&filtro=' + item.texto + '&limit=10', fun, params);
    this.filtro2 = item.titulo;
  }

  cacelarFiltro2() {
    this.lojas = this.servico.getEmpresas();
    this.filtro2 = '';
  }

}

