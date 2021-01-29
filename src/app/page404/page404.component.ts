import { Router } from '@angular/router';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(private servico: ServiceappService, private router: Router) { }

  ngOnInit(): void {
  }
  inicio() {
    if (this.servico.sistemMultStores) {
      this.router.navigate(['/lojas']);
    } else {
      this.router.navigate(['']);
    }
  }
}
