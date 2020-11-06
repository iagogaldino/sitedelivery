import { ServiceappService } from './../../service/serviceapp.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addfp',
  templateUrl: './addfp.component.html',
  styleUrls: ['./addfp.component.css']
})
export class AddfpComponent implements OnInit {

  constructor(public service: ServiceappService,
              public dialogRef: MatDialogRef<AddfpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onClickConfirm() {
    this.dialogRef.close();
  }

}
