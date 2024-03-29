import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import { SocialAuthService } from 'angularx-social-login';
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
              private router: Router, public service: ServiceappService, private crud: CrudService, private cookies: CookieService,
              private authService: SocialAuthService) {
    // Se não existir dados do usuário - direciona para página inicio]
    if (!this.service.getDadosUsuario().id) { this.router.navigate(['']); }
  }

  ngOnInit(): void {
    this.onClickMenu('/perfil-user/orders', 'Pedidos');
  }

  onClickMenu(rota: string, tittle: string) {
    this.tittle = tittle;
    this.router.navigate([rota]);
    try {
      if (window.innerWidth < 600) {
        document.getElementById('btnav').click();
      }
    } catch (e) {}
  }

  onClickExit() {
    this.setSession();
    console.log('onClickExit')
    // this.cookies.deleteAll();
    sessionStorage.removeItem('user');
    window.location.reload();

    // const tu = setInterval(() => {
    //   if (!this.cookies.check('user')) {
    //     this.signOut();
    //     window.location.reload();
    //     clearInterval(tu);
    //   }

    // }, 500);

  }

  signOut(): void {
    this.authService.signOut();
  }
  onclickHH() {
    if (this.service.sistemMultStores) {
      if (this.service.perfilEmpresa === true) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/lojas']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  setSession() {
    const accallback = () => {};
    this.crud.post_api('setSession', accallback, { nome: 'limpar', valor: '' }, true);
  }


}
