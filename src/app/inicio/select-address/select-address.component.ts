import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {

  myControl = new FormControl();
  myControl2 = new FormControl();
  options = this.service.getDadosEmpresa().locais_entrega;
  neighborhoods: Array<any>;
  statusCity = false;

  constructor(public service: ServiceappService) { }

  ngOnInit(): void {
  }

  selectCity(item: any) {
    console.log(item);
    this.statusCity = true;
    this.neighborhoods = item.bairros;
  }
}
