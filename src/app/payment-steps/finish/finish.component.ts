import { ServiceappService } from './../../service/serviceapp.service';
import { AddfpComponent } from './../addfp/addfp.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  constructor(public dialog: MatDialog, public service: ServiceappService) { }

  ngOnInit(): void {
  }

  addFp(item) {
    const dialogRef = this.dialog.open(AddfpComponent, {
      width: '550px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
