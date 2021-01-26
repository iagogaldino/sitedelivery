import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
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
  cidadeSelecionada = {id: 0};
  bairroSelecionado = {id: 0};
  constructor( public dialogRef: MatDialogRef<SelecionarEnderecoBuscarLojaComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private servico: ServiceappService, private crud: CrudService) { }

  ngOnInit(): void {
    this.cidades = this.data.cidades;

    this.bairros = [];

  }

  onclickBack() {
    this.tipoCaixa = 1;
  }

  clickSelecionarCidade(item) {
    this.tipoCaixa = 2;
    this.bairros = item.bairros;
    this.cidadeSelecionada.id = item.id;
  }
  onvlickSelecionarBairro(item) {
    this.statusLoaderLojas = true;
    this.bairroSelecionado.id = item.id;

    this.buscarLojas();
  }

  buscarLojas() {
    const a = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro) { this.servico.mostrarMensagem(r.detalhes); return; } else {
        this.servico.setEmpresas(r.empresas);
        this.dialogRef.close(true);
      }
    };
    this.crud.post_api('empresas-local', a, {cidade: this.cidadeSelecionada, bairro: this.bairroSelecionado}, false);

  }



}
