import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {IProgram} from '../model/type';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    createVideoCategory(category: any) {
        return this.httpClient.post<any>(`${environment.api_url}/video/category`, category)
            .do(data => {
                return data;
            });
    }
    getVideoCategoryByUser() {
        return this.httpClient.get(`${environment.api_url}` + '/video/user/category')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    getPostCategoryByUser() {
        return this.httpClient.get(`${environment.api_url}` + '/post/user/category')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    getProgramByUser() {
        return this.httpClient.get(`${environment.api_url}` + '/program/user/category')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    getAllCategory() {
        return this.httpClient.get(`${environment.api_url}` + '/video/category')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    getAllProgram() {
        return this.httpClient.get(`${environment.api_url}` + '/program/category')
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    createCategory(program: IProgram) {
        return this.httpClient.post<any>(`${environment.api_url}/program/category `, program)
            .do(data => {
                return data;
            });
    }

    getDetailVideoCategory(id: number) {
        return this.httpClient.get(`${environment.api_url}` + '/video/category/' + id)
            .toPromise()
            .then((response) => {
                return response;
            })
            .catch(this.handleError);
    }

    updateVideoCategory(category: any) {
        return this.httpClient.put<any>(`${environment.api_url}/video/category/${category.id}`, category)
            .do(data => {
                return data;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
