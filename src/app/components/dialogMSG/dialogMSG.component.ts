import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormAddressComponent } from 'src/app/conta_usuario/adresses/form-address/form-address.component';
import { LojasService } from 'src/app/multLojas/lojas/lojas.service';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-dialogMSG',
  templateUrl: './dialogMSG.component.html',
  styleUrls: ['./dialogMSG.component.scss']
})
export class DialogMSGComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: ServiceappService,
    private crud: CrudService, private lojaServ: LojasService) { }

  ngOnInit() {
  }

}
