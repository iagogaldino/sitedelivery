import { AvalsComponent } from './../avals/avals.component';
import { CrudService } from './../../service/crud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evaluate-order',
  templateUrl: './evaluate-order.component.html',
  styleUrls: ['./evaluate-order.component.css']
})
export class EvaluateOrderComponent implements OnInit {
  entrelas: any;
  notaUs: any;
  statusBt = false;
  form: FormGroup;
  constructor(private service: ServiceappService, private crud: CrudService, private fb: FormBuilder,
              public dialogRef: MatDialogRef<AvalsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.entrelas = [
      { nota: 1, selecionado: false },
      { nota: 2, selecionado: false },
      { nota: 3, selecionado: false },
      { nota: 4, selecionado: false },
      { nota: 5, selecionado: false }
    ];


    this.form = this.fb.group(
      {
        id_cliente: [this.service.getDadosUsuario().id],
        id_empresa: [this.service.getDadosEmpresa().id],
        id_pedido: [this.data.id],
        imagem: [this.service.getDadosUsuario().imagem],
        nome: [this.service.getDadosUsuario().nome],
        nome_empresa: [this.service.getDadosEmpresa().nome],
        comentario: [''],
        nota: [false]
      });

  }


  onClickEstrela(nota: number) {
    console.log('onClickEstrela');
    console.log(nota);
    this.funEst(nota, true);
    this.notaUs = nota;
  }

  funEst(nota: number, status: boolean) {
    this.entrelas.forEach(element => {
      if (nota >= element.nota) { element.selecionado = status; } else { element.selecionado = false; }
    });
  }

  setPost() {
    this.statusBt = true;
    console.log(this.form.value);

    const fun = () => {
      const res = this.service.getRespostaApi();
      if (res.erro === true) {
        this.statusBt = false;
        console.error(res.detalhes);
        alert(res.detalhes);
      } else {
        console.warn(res.detalhes);
        this.service.mostrarMensagem(res.detalhes);
        this.dialogRef.close();
      }
    };

    this.crud.post_api('avaliar_pedido', fun, this.form.value);
  }

  onClickEnviar() {
    this.form.value.nota = this.notaUs;
    console.log(this.form.value);
    if (!this.form.value.nota) { this.service.mostrarMensagem('Seleicone a quantidade de estrelas'); return; }
    this.setPost();
  }

}
