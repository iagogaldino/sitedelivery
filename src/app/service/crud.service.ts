import { ServiceappService } from './serviceapp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private servico: ServiceappService, private http: HttpClient,
              private activatedRoute: ActivatedRoute, private router: Router) {
    // this.getIdEmpresa();
  }


  public pegaHost(): Observable<any> { return this.http.get('./assets/json/config.json'); }


  public get_api(acao: string): Observable<any> {
    return this.http.get(this.servico.getApiAcao(acao));
  }

  public getIdEmpresa() {

    this.activatedRoute.queryParams.subscribe(params => {

      if (params.loja && this.servico.sistemMultStores === true) {
        this.http.get(this.servico.getApiAcao('buscar-empresa-nome&loja=' + params.loja)).subscribe((data: any) => {
          if (data.erro) {
            this.servico.setIdEmpresa(0);
          } else {
            this.servico.setIdEmpresa(data.resultado.id);
          }
        });
      }

    });
  }

  public getIdEmpresaNome(nomeEmpresa: string) {


        this.http.get(this.servico.getApiAcao('buscar-empresa-nome&loja=' + nomeEmpresa)).subscribe((data: any) => {
          if (data.erro) {
            this.servico.setIdEmpresa(0);
          } else {
            this.servico.setIdEmpresa(data.resultado.id);
          }
        });

  }

  public post_api(acao: string, acaoCallBack, param: any, mostrarProgesso?: boolean): Observable<any> {
    return $.post(this.servico.getApiAcao(acao, mostrarProgesso), { obj: param },
      (data: any, status: any) => {
        /*  console.log(data); */
        this.servico.setRespostaApi(JSON.parse(data));
        // this.servico.setRespostaApi(data);
        acaoCallBack();
        if (mostrarProgesso) { /* this.progServ.showProgress.emit(false); */ }
      });
  }

}
