import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-telefone-usuario',
  templateUrl: './telefone-usuario.component.html',
  styleUrls: ['./telefone-usuario.component.css']
})
export class TelefoneUsuarioComponent implements OnInit {
  form: FormGroup;
  bts = false;
  constructor(private fb: FormBuilder, private crud: CrudService, private service: ServiceappService,
              private dialog: MatDialog, public dialogRef: MatDialogRef<TelefoneUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      telefone: [''],
    });
  }

  enviar() {
    this.bts = true;
    const a = () => {
      const r = this.service.getRespostaApi();
      this.bts = false;
      if (r.erro) { this.service.mostrarMensagem(r.detalhes); return; }
      this.dialogRef.close(r.resultado);
    };
    this.crud.post_api('attTelefoneUsuario', a, this.form.value, false);
  }

}
