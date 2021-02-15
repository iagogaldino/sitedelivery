import { CookieService } from 'ngx-cookie-service';
import { LojasService } from './../lojas/lojas.service';
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
  cidadeSelecionada = { id: 0, nome: '' };
  bairroSelecionado = { id: 0, nome: '' };
  constructor(public dialogRef: MatDialogRef<SelecionarEnderecoBuscarLojaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servico: ServiceappService,
    private crud: CrudService,
    public lojaServ: LojasService,
    private cookie: CookieService) { }

  ngOnInit(): void {
    this.cidades = this.lojaServ.getCidadesSistema();
    this.bairros = [];

  }

  onclickBack() {
    if (this.tipoCaixa === 1) {
      this.dialogRef.close();
      return;
    }
    this.tipoCaixa = 1;
  }

  clickSelecionarCidade(item) {
    this.tipoCaixa = 2;
    this.bairros = item.bairros;
    this.cidadeSelecionada.id = item.id;
    this.lojaServ.setEnderecoCidade(item);

  }
  onvlickSelecionarBairro(item) {
    this.statusLoaderLojas = true;
    this.bairroSelecionado.id = item.id;
    this.lojaServ.setEnderecoBairro(item);
    this.buscarLojas();

  }

  onClickEntrar() {
    this.dialogRef.close('entrar');
  }

  buscarLojas() {

    const a = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro) { this.servico.mostrarMensagem(r.detalhes); return; } else {
        this.servico.setEmpresas(r.empresas);
        this.servico.descLoader = r.detalhes;
        this.dialogRef.close(true);

      }
    };
    this.crud.post_api('empresas-local', a, { cidade: this.cidadeSelecionada, bairro: this.bairroSelecionado }, false);

  }



}
