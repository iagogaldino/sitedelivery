import { Router } from '@angular/router';
import { LoginComponent } from './../../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-user-data',
  templateUrl: './input-user-data.component.html',
  styleUrls: ['./input-user-data.component.css']
})
export class InputUserDataComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  entrar() {
    //this.dialog.open(LoginComponent);
    this.router.navigate(['']);
  }

}
