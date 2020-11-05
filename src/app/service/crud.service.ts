import { ServiceappService } from './serviceapp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private servico: ServiceappService, private http: HttpClient) { }


  public pegaHost(): Observable<any> { return this.http.get('./assets/json/config.json'); }


  public get_api(acao: string): Observable<any> {
    return this.http.get(this.servico.getApiAcao(acao));
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
