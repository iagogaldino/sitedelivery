import { FormAddressComponent } from './form-address/form-address.component';
import { CrudService } from './../../service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit {

  itens: Array<any>;
  statusbt = false;

  constructor(private service: ServiceappService, private crud: CrudService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.itens = this.service.getDadosUsuario().endereco;
  }

  onRemoverEndereco(item) {
    console.log('#Remover endereço');
    console.log(item);
    this.statusbt = true;
    const fun = () => {
      const res = this.service.getRespostaApi();
      if (res.erro === true) { this.statusbt = false; /*alert(res.detalhes);*/ return; }
      this.service.mostrarMensagem(res.detalhes);
      this.itens = res.obj;
      this.statusbt = false;
    };
    this.crud.post_api('remover_endereco', fun, {idusuario: this.service.getDadosUsuario().id, idendereco: item.id });
  }

  addAddress(): void {
    const dialogRef = this.dialog.open(FormAddressComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
