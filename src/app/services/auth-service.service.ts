import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs';
import {environment} from './../../environments/environment.prod';

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
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', (JSON.stringify(data.user)));
                localStorage.setItem('role', (data.user.roles[0].name));
            });
    }

    check(): boolean {
        return localStorage.getItem('user') ? true : false;
    }

    logout(): void {
        this.httpClient.get(`${environment.api_url}/auth/logout`);
        localStorage.clear();
    }

    getRoleUser() {
      return localStorage.getItem('role') ? localStorage.getItem('role') : null;
    }
}
