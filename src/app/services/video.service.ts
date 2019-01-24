import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {IVideoForm} from '../model/type';
import {VideoPaginate} from '../model/video-paginate.model';
import {Video} from '../model/video.model';
@Injectable({
    providedIn: 'root'
})
export class VideoService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getVideoDraft(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/draft')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    getVideoEditor(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/waiting/editor')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    getVideoPublish(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/waiting/publish')
            .toPromise()
            .then((response) => {
              return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    getVideoPublished(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/published')
            .toPromise()
            .then((response) => {
              return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    getDetailVideoById(id: number) {
        return this.httpClient.get(`${environment.api_url}` + '/video/' + id)
            .toPromise()
            .then((response) => {
                return response as Video;
            })
            .catch(this.handleError);
    }

    getVideosAtUrl(url: string): Promise<VideoPaginate> {
        return this.httpClient.get(url)
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    create(video: IVideoForm) {
        return this.httpClient.post<any>(`${environment.api_url}/video`, video)
            .do(data => {
                return data;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
