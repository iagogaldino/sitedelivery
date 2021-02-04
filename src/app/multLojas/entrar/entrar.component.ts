import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {
  form: FormGroup;
  statusBt = false;
  tipo = 1;
  btRecC = false;
  constructor(private route: Router, private fb: FormBuilder, private crud: CrudService, private service: ServiceappService,
              private cookies: CookieService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      email: [''],
      senha: [''],
    });

    if (this.service.getDadosUsuario().id) {
      this.route.navigate(['/perfil-user/orders']);
    }

  }

  entrar() {
    this.statusBt = true;
    const a = () => {
      const r = this.service.getRespostaApi();
      if (r.erro) { this.service.mostrarMensagem(r.detalhes); this.statusBt = false; return; }
      this.service.setDadosUsuario(r.resultado);
      this.service.setToken(r.resultado.token);
      setTimeout( () => {
        this.service.mostrarMensagem('Seja bem vindo ' + r.resultado.nome + '!');
        // Salva COOKIES DO USU
        this.cookies.set('user', this.form.value.email, {expires: 60});
        this.cookies.set('pass', this.form.value.senha, {expires: 60});
        this.route.navigate(['/lojas']);
      } , 600 );
    };
    this.crud.post_api('login', a, this.form.value, false);

  }

}
