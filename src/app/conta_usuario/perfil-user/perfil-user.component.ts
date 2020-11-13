import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css']
})
export class PerfilUserComponent implements OnInit {

  tittle: string;
  opened: boolean;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router, public service: ServiceappService, private crud: CrudService, private cookies: CookieService) {
    // Se não existir dados do usuário - direciona para página inicio]
    if (!this.service.getDadosUsuario().id) { this.router.navigate(['']); }
  }

  ngOnInit(): void {
    this.onClickMenu('/perfil-user/orders', 'Pedidos');
  }

  onClickMenu(rota: string, tittle: string) {
    this.tittle = tittle;
    this.router.navigate([rota]);
  }

  onClickExit() {
    this.cookies.deleteAll();
    // this.router.navigate(['']);
    setTimeout(() => { window.location.reload(); }, 800);
  }


}
