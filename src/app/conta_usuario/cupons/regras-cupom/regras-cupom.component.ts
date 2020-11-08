import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-regras-cupom',
  templateUrl: './regras-cupom.component.html',
  styleUrls: ['./regras-cupom.component.css']
})
export class RegrasCupomComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegrasCupomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
