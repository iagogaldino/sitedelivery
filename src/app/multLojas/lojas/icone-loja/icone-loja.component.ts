import { Router } from '@angular/router';
import { ServiceappService } from './../../../service/serviceapp.service';
import { BagService } from './../../../inicio/bag/bag.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icone-loja',
  templateUrl: './icone-loja.component.html',
  styleUrls: ['./icone-loja.component.css']
})
export class IconeLojaComponent implements OnInit {
  @Input() item: { status_delivery: boolean, imagem: '', nome: '', formasfuncionamento: { tipo: number }, taxa_entrega: '', bairro: '', cidade: '', desconto: { desconto: '', statusPromocao: boolean }, pedidomin: '', nota: { nota: '' }, tempoentrega: '' };
  constructor(private bagServ: BagService, private servico: ServiceappService, private router: Router) { }

  ngOnInit(): void {
  }
  verEmpresa(item: any): void {
    if (!item.id) { return; }
    this.bagServ.limparCarrinho();
    this.servico.setIdEmpresa(item.id);
    this.router.navigate(['']);
  }
}
