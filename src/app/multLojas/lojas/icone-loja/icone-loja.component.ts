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
  @Input() item: any;
  constructor(private bagServ: BagService, private servico: ServiceappService, private router: Router) { }

  ngOnInit(): void {
  }
  verEmpresa(item: any): void {
    if (!item.id) { return; }
    if (item.id !== this.servico.getIdEmpresa()) {
    this.bagServ.limparCarrinho();
    }
    this.servico.setIdEmpresa(item.id);
    this.router.navigate(['']);
  }
}
