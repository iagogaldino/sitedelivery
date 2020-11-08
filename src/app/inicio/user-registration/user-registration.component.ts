import { Router } from '@angular/router';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(public service: ServiceappService, private router: Router) { }

  ngOnInit(): void {
    if (!this.service.getDadosEmpresa().id) {
      this.router.navigate(['']);
    }
  }

}
