import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-router-inbag',
  templateUrl: './router-inbag.component.html',
  styleUrls: ['./router-inbag.component.css']
})
export class RouterInbagComponent implements OnInit {
  public bag = true;
  constructor(public service: ServiceappService) { }

  ngOnInit(): void {
  }

}
