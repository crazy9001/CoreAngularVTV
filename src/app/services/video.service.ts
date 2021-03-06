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

    /**
     * This function get list video draft
     */
    getVideoDraft(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/draft')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list news draft
     */
    getNewsDraft(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/post/draft')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list video editor
     */
    getVideoEditor(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/waiting/editor')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list news editor
     */
    getNewsEditor(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/post/waiting/editor')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }


    /**
     * This function receiver post
     * @param id
     */
    receiverPost (id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/receiver', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /**
     * This function unreceiver post
     * @param id
     */
    unReceiverPost(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/unReceiver', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    getBackEditorPost(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/editor/getBack', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /**
     * This function get list news receiver editor
     */
    getReceiverNewsEditor(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/post/receiver/editor')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list news  receiver publish
     */
    getReceiverNewsPublish(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/post/receiver/publish')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list video publish
     */
    getVideoPublish(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/waiting/publish')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list news publish
     */
    getNewsPublish(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/post/waiting/publish')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }


    /**
     * This function get list video published
     */
    getVideoPublished(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/published')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list news published
     */

    getNewsPublished(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/post/published')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * This function get list video publish to highlight
     * @param page
     */
    getVideoPublishedPaginate(page: number = 1) {
        return this.httpClient.get(`${environment.api_url}` + `/video/paginate/published?page=${page}`);
    }

    /**
     * Thif function get list video trash
     */
    getVideoTrashed(): Promise<VideoPaginate> {
        return this.httpClient.get(`${environment.api_url}` + '/video/trashed')
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    /**
     * Get detail video by id
     * @param id
     */
    getDetailVideoById(id: number) {
        return this.httpClient.get(`${environment.api_url}` + '/video/' + id)
            .toPromise()
            .then((response) => {
                return response as Video;
            })
            .catch(this.handleError);
    }

    /**
     * Get detail news by id
     * @param id
     */
    getDetailNewsById(id: number) {
        return this.httpClient.get(`${environment.api_url}` + '/post/' + id)
            .toPromise()
            .then((response) => {
                return response as Video;
            })
            .catch(this.handleError);
    }

    /**
     * Paginate
     * @param url
     */
    getVideosAtUrl(url: string): Promise<VideoPaginate> {
        return this.httpClient.get(url)
            .toPromise()
            .then((response) => {
                return response as VideoPaginate;
            })
            .catch(this.handleError);
    }

    getVideoHighLight() {
        return this.httpClient.get(`${environment.api_url}` + '/video/highlight')
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

    createPost(video: IVideoForm) {
        return this.httpClient.post<any>(`${environment.api_url}/post`, video)
            .do(data => {
                return data;
            });
    }

    update(video: IVideoForm) {
        return this.httpClient.put<any>(`${environment.api_url}/video/${video.id}`, video)
            .do(data => {
                return data;
            });
    }

    /* change video to editor */
    changeVideoToEditor(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/video/to/editor', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /* Change news to editor */
    changeNewsToEditor(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/to/editor', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /* change video to publish */
    changeVideoToPublish(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/video/to/publish', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /* change news to publish */
    changeNewsToPublish(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/to/publish', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /* change video to published */
    publishVideo(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/video/to/published', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /* Published news */
    publishNews(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/to/published', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }

    /* remove video */
    removeVideo(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/video/to/trash', {id: id})
            .toPromise()
            .then((response) => {
                return response;
            });
    }
    /* remove news */
    removeNews(id: number) {
        return this.httpClient.post<any>(`${environment.api_url}` + '/post/to/trash', {id: id})
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
