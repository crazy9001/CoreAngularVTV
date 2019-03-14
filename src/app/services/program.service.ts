import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProgramService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getAllProgram() {
        return this.httpClient.get(`${environment.api_url}` + '/program/category')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    removeProgram(id: number) {
        return this.httpClient.delete<any>(`${environment.api_url}` + '/program/category/' + id)
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
