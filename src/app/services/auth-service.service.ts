import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs';
import {environment} from './../../environments/environment.prod';
import {CONST} from './app-const';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    login(credentials: { email: string, password: string }): Observable<boolean> {
        return this.httpClient.post<any>(`${environment.api_url}/auth/login`, credentials)
            .do(data => {
                localStorage.setItem(CONST.STORE_TOKEN, data.token);
                localStorage.setItem(CONST.STORE_USER, (JSON.stringify(data.user)));
                localStorage.setItem(CONST.STORE_ROLE, (data.user.roles[0].name));
            });
    }

    check(): boolean {
        return localStorage.getItem(CONST.STORE_USER) ? true : false;
    }

    logout(): void {
        this.httpClient.get(`${environment.api_url}/auth/logout`);
        localStorage.clear();
    }

    getRoleUser() {
      return localStorage.getItem(CONST.STORE_ROLE) ? localStorage.getItem(CONST.STORE_ROLE) : null;
    }
}
