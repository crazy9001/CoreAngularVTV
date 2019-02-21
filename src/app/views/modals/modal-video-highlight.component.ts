import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import { tap, skipWhile } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-modal-video-highlight',
    templateUrl: './modal-video-highlight.component.html',
})
export class ModalVideoHighlightComponent implements OnInit, AfterViewInit {
    @ViewChild('videoHighlightModal') public videoHighlightModal: ModalDirective;

    environment: any;

    public videos: Array<any> = [];

    public httpReqestInProgress: boolean = false;

    private currentPage = 1;

    constructor(
        private http: HttpClient,
        private videoService: VideoService
    ) {
        this.environment = environment;
    }

    ngOnInit() {

    }

	ngAfterViewInit() {
		this.getVideosPublished(
			this.currentPage,
			(videos) => {
				this.videos = this.videos.concat(videos);
			});
	}

    show() {
        this.videoHighlightModal.show();
    }

    hide() {
        this.videoHighlightModal.hide();
    }

    public onScrollUp(): void {
        this.getVideosPublished(
            this.currentPage,
            (news) => {
                this.videos = news.concat(this.videos);
            });
    }

    public onScrollDown(): void {
        this.getVideosPublished(
            this.currentPage,
            (news) => {
                this.videos = this.videos.concat(news);
            });
    }

    private getVideosPublished(page: number = 1, saveResultsCallback: (videos) => void) {
        return this.videoService.getVideoPublishedPaginate(page).pipe(
            skipWhile(() => this.httpReqestInProgress),
            tap(() => { this.httpReqestInProgress = true; })
        ).subscribe((videos: any[]) => {
            this.currentPage++;
            saveResultsCallback(videos);
            this.httpReqestInProgress = false;
        });
    }

}
