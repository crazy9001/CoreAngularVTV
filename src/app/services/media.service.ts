import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MediaPaginateModel} from '../model/media-paginate.model';
import {environment} from './../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class MediaService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getMediaVideo(): Promise<MediaPaginateModel> {
        return this.httpClient.get(`${environment.api_url}` + '/media/gallery?action=video')
            .toPromise()
            .then((response) => {
                return response as MediaPaginateModel;
            })
            .catch(this.handleError);
    }

    getMediaAtUrl(url: string): Promise<MediaPaginateModel> {
        return this.httpClient.get(url)
            .toPromise()
            .then((response) => {
                return response as MediaPaginateModel;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
