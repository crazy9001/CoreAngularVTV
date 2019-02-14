import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient} from '@angular/common/http';
import {environment} from './../../../environments/environment.prod';
import {Observable} from 'rxjs/Rx';
import {CONST} from './../../services/app-const';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
            if (errorResponse.status === 401 && errorResponse.error.error === 'token_expired') {
                const http = this.injector.get(HttpClient);
                return http.post<any>(`${environment.api_url}/auth/refresh`, {})
                    .flatMap(data => {
                        localStorage.setItem(CONST.STORE_TOKEN, data.token);
                        const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data.token}`}});
                        return next.handle(cloneRequest);
                    });
            }
            return Observable.throw(errorResponse);
        });
    }
}
