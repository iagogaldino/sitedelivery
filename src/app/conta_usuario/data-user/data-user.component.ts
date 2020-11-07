import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent implements OnInit {
  form: FormGroup;
  constructor(public service: ServiceappService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [this.service.getDadosUsuario().nome],
      telefone: [this.service.getDadosUsuario().telefone],
      rua: [this.service.getDadosUsuario().rua],
      numero: [this.service.getDadosUsuario().numero],
      bairro: [this.service.getDadosUsuario().bairro],
      cidade: [this.service.getDadosUsuario().cidade],
      complemento: [this.service.getDadosUsuario().complemento],
      ponto_referencia: [this.service.getDadosUsuario().ponto_referencia]
    });
  }

}
