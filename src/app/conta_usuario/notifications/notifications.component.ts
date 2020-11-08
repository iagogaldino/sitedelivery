import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Array<any>;
  statusLoader = false;
  constructor(private router: Router, public service: ServiceappService, private crud: CrudService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
   this.notificationsUser();
  }

  notificationsUser() {
    this.crud.get_api('notificacoes_usu&id_usuario=' + this.service.getDadosUsuario().id).subscribe( data => {
      this.notifications = data.obj;
      this.statusLoader = true;
    }, error => {  this.service.mostrarMensagem('Ocorreu um erro inesperado'); } );
  }
}
