import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    create(menu: {
        name: string,
        link_type: string,
        category: number,
        link: string,
        status: number,
        position: string,
        blank_type: number
    }) {
        return this.httpClient.post<any>(`${environment.api_url}/menu`, menu)
            .do(data => {
                return data;
            });
    }

    getAllMenu() {
        return this.httpClient.get(`${environment.api_url}` + '/menu')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
