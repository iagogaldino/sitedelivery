import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit {

  itens: Array<any>;

  constructor(private service: ServiceappService) { }

  ngOnInit(): void {
    this.itens = this.service.getDadosUsuario().endereco;
  }

}
