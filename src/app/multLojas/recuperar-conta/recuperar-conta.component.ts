import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrls: ['./recuperar-conta.component.css']
})
export class RecuperarContaComponent implements OnInit {
  btRecC = false;
  form: FormGroup;
  statusBt = false;
  constructor(private route: Router, private fb: FormBuilder, private crud: CrudService, private service: ServiceappService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      senha: [''],
    });

  }
  recuperar() {
    this.btRecC = true;
    const a = () => {
      const r = this.service.getRespostaApi();
      this.btRecC = false;
      if (r.erro) { this.service.mostrarMensagem(r.detalhes); return; }
      this.route.navigate(['/entrar']);
    };
    this.crud.post_api('enviarSenhaTel', a, this.form.value, false);
  }
}
