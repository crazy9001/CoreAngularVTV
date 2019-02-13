import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {UsersPaginate} from '../model/users-paginate.model'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers(): Promise<UsersPaginate> {
    return this.httpClient.get(`${environment.api_url}` + '/users')
    .toPromise()
    .then((response) => {
        return response as UsersPaginate;
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
