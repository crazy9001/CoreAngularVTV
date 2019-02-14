import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {environment} from './../../../environments/environment.prod';
import {Observable} from 'rxjs/Observable';
import {CONST} from './../../services/app-const';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const token = localStorage.getItem(CONST.STORE_TOKEN);
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = environment.api_url.split('/');
        if (token && (requestUrl[2] === apiUrl[2])) {
            const newRequest = request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
            return next.handle(newRequest);
        } else {
            return next.handle(request);
        }
    }
}

