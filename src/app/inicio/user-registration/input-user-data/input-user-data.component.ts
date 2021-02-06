import { CrudService } from './../../../service/crud.service';
import { ServiceappService } from './../../../service/serviceapp.service';
import { UserRegistrationService } from './../user-registration.service';
import { Router } from '@angular/router';
import { LoginComponent } from './../../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-user-data',
  templateUrl: './input-user-data.component.html',
  styleUrls: ['./input-user-data.component.css']
})
export class InputUserDataComponent implements OnInit {

  form: FormGroup;
  typeReg: any;
  statusbt = false;
  typeRegister: any;
  constructor(private dialog: MatDialog, private router: Router, public userServ: UserRegistrationService, private fb: FormBuilder,
              private service: ServiceappService, private crud: CrudService) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [''],
      telefone: [this.userServ.getDataUserPhone()],
      senha: [''],
      csenha: [''],
      email: [this.userServ.getDataUserEmail()],
    });
    this.typeReg = this.userServ.getTypeReg();
    if (this.typeReg === 'email') { this.typeRegister = 'finalizarCadEmail'; } else {
      this.typeRegister = 'finalizarCadTelefone';
    }

    try {
      document.addEventListener('keypress', (e) => { if (e.which === 13) { this.done(); } }, false);
    } catch (e) { console.log(e); }
  }

  done() {
    if (!this.form.value.nome) { this.service.mostrarMensagem('Informe seu nome completo'); return; }
    if (!this.form.value.senha) { this.service.mostrarMensagem('Informe sua senha'); return; }
    this.postApi();
  }



  postApi() {
    this.statusbt = true;
    const a = () => {

      const r = this.service.getRespostaApi();
      if (r.erro) {
        this.statusbt = false;
        this.service.mostrarMensagem(r.detalhes);
        return;
      }
      this.entrarConta(r.obj.login, r.obj.senha);
    };
    this.crud.post_api(this.typeRegister, a, this.form.value, false);

  }

  entrarConta(login: string, pass: string) {
    const a = () => {
      const r = this.service.getRespostaApi();
      console.log(r);
      if (r.erro) { this.service.mostrarMensagem(r.detalhes); return; }
      this.dialog.closeAll();
      this.service.setDadosUsuario(r.resultado);
      this.service.setToken(r.resultado.token);
      setTimeout(() => {
        this.service.mostrarMensagem('Seja bem vindo ' + r.resultado.nome + '!');
        if (this.service.paginaDepoisCadastro) {
          this.router.navigate([this.service.paginaDepoisCadastro]);
          this.service.paginaDepoisCadastro = '';
        } else {
        this.router.navigate(['']);
        }
      }, 600);
    };
    this.crud.post_api('login', a, { email: login, senha: pass }, false);

  }

  entrar() {
    this.router.navigate(['']);
  }

}
