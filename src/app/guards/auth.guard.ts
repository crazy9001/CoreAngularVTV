import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private routerService: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.check()) {
            return true;
        } else {
            this.routerService.navigate(['login']);
            return false;
        }
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.check()) {
            return true;
        } else {
            this.routerService.navigate(['login']);
            return false;
        }
    }
}
