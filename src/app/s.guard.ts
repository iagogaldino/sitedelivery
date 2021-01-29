import { ServiceappService } from './service/serviceapp.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SGuard implements CanActivate {

  constructor(private service: ServiceappService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.sistemMultStores) {
      // Se o sistema for para mult lojas
     // this.router.navigate(['buscar-lojas']);
     // return;
    }
    return true;
  }

}
