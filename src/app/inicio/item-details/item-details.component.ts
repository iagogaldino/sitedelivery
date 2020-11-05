import { Router } from '@angular/router';
import { ItemDetailsService } from './item-details.service';
import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  item: any;
  statusLoader = false;

  constructor(private servico: ServiceappService, private crud: CrudService, private itemServ: ItemDetailsService
              /*public dialogRef: MatDialogRef<ItemDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any*/,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.itemServ.getItem()) { this.router.navigate(['']); return; }
    this.crud.get_api('consulta_item&id_item=' + this.itemServ.getItem().id + '&id_empresa=' + this.itemServ.getItem().id_empresa).
    subscribe(data => {
      this.item = data.item;
      this.statusLoader = true;
    }, error => {});
  }

}
