import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceappService } from './../../service/serviceapp.service';
import { CrudService } from './../../service/crud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  statusBt = false;
  constructor(private route: Router, private fb: FormBuilder, private crud: CrudService, private service: ServiceappService,
              private dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  entrar() {
    this.statusBt = true;
    const a = () => {
      const r = this.service.getRespostaApi();
      console.log(r);
      this.statusBt = false;
      if (r.erro) { this.service.mostrarMensagem(r.detalhes); return; }
      this.dialog.closeAll();
      this.service.setDadosUsuario(r.resultado);
      setTimeout( () => {
        this.service.mostrarMensagem('Seja bem vindo ' + r.resultado.nome + '!');
        if (this.data.router) {
        this.route.navigate(['/perfil-user']);
        } else {
          if (this.data.routerName) { this.route.navigate([this.data.routerName]); }
        }
      } , 600 );
    };
    this.crud.post_api('login', a, this.form.value, false);

  }

}
