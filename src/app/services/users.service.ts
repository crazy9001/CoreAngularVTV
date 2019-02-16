import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {UsersPaginate} from '../model/users-paginate.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getAllUsers(): Promise<UsersPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/users')
            .toPromise()
            .then((response) => {
                return response as UsersPaginate;
            })
            .catch(this.handleError);
    }

    getUsersAtUrl(url: string): Promise<UsersPaginate> {
        return this.httpClient.get(url)
            .toPromise()
            .then((response) => {
                return response as UsersPaginate;
            })
            .catch(this.handleError);
    }
    changePasswordUser(user: {
        id: number,
        password: string
    }) {
        return this.httpClient.post<any>(`${environment.api_url}/user/changePassword`, user)
            .do(data => {
                return data;
            });
    }
    create(user: {
        username: string,
        password: string,
        email: string,
        name: string,
    }) {
        return this.httpClient.post<any>(`${environment.api_url}/users`, user)
            .do(data => {
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
