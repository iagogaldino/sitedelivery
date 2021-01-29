import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-mult-lojas',
  templateUrl: './toolbar-mult-lojas.component.html',
  styleUrls: ['./toolbar-mult-lojas.component.css']
})
export class ToolbarMultLojasComponent implements OnInit {
  @Input() pagina = '';
  constructor(private router: Router, private servico: ServiceappService) { }

  ngOnInit(): void {
  }

  onClickBack() {
    if (this.pagina) {
      this.router.navigate([this.pagina]);
      return;
    }
    if (this.servico.sistemMultStores) {
      this.router.navigate(['/lojas']);
    } else {
      this.router.navigate(['']);
    }
  }

}
