import { CrudService } from './../../service/crud.service';
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
  formulario: FormGroup;
  statusbt = false;
  constructor(public service: ServiceappService, private fb: FormBuilder, private crud: CrudService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id_usuario: [this.service.getDadosUsuario().id],
      nome: [this.service.getDadosUsuario().nome],
      sobrenome: [this.service.getDadosUsuario().sobrenome],
      cpf: [this.service.getDadosUsuario().cpf],
      datanascimento: [this.service.getDadosUsuario().datanascimento],
      telefone: [this.service.getDadosUsuario().telefone],
    });

    this.formulario = this.fb.group({
      id_usuario: [this.service.getDadosUsuario().id],
      senha: [''],
      novasenha: [''],
      senhaconfirmacao: [''],
    });
  }

  onclicksalvar() {
    console.log('#onclicksalvar');
    const fun = () => {
      const res = this.service.getRespostaApi();
      if (res.erro === true) { this.statusbt = false; this.service.mostrarMensagem(res.detalhes); return; } else {
        this.service.mostrarMensagem(res.mensagem);
      }

    };
    this.crud.post_api('att_senha', fun, this.formulario.value);
  }

  oncliClickSalvar() {
    const fun = () => {
      const res = this.service.getRespostaApi();
      if (res.erro === true) { this.statusbt = false; this.service.mostrarMensagem(res.detalhes); return; }

      this.service.setDadosUsuarioNome(res.obj.nome);
      this.service.setDadosUsuarioSNome(res.obj.sobrenome);
      this.service.setDadosUsuarioCpf(res.obj.cpf);
      this.service.setDadosUsuarioDataNasc(res.obj.datanasc);
      this.service.setDadosUsuarioTel(res.obj.telefone);
      this.service.mostrarMensagem(res.detalhes);

    };
    this.crud.post_api('editar_perfil', fun, this.form.value);
  }

}
