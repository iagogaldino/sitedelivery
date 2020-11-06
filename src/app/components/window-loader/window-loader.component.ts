import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-window-loader',
  templateUrl: './window-loader.component.html',
  styleUrls: ['./window-loader.component.css']
})
export class WindowLoaderComponent implements OnInit {
  @Input() status: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
