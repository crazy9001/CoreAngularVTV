import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {tap, skipWhile} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SettingService} from '../../services/setting.service';
@Component({
    selector: 'app-modal-video-highlight',
    templateUrl: './modal-video-highlight.component.html',
})
export class ModalVideoHighlightComponent implements OnInit, AfterViewInit {
    @ViewChild('videoHighlightModal') public videoHighlightModal: ModalDirective;

    @ViewChild('listVideoRef') listVideoRef: ElementRef;

    environment: any;

    hightlightStatus: Array<boolean> = [];

    public videos: Array<any> = [];

    public videosHighLight: Array<any> = [];

    public listItemSelected: string[] = [];

    public httpReqestInProgress: boolean = false;

    private currentPage = 1;

    constructor(
        private http: HttpClient,
        private videoService: VideoService,
        private settingService: SettingService
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
            tap(() => {
                this.httpReqestInProgress = true;
            })
        ).subscribe((videos: any[]) => {
            this.currentPage++;
            saveResultsCallback(videos);
            this.httpReqestInProgress = false;
        });
    }
    private getVideoHighLight() {
        this.videoService.getVideoHighLight().then(videos => {
            this.videosHighLight = videos;
        });
    }
    eventSaveHighlight() {
        this.listItemSelected = this.getIds();
        this.settingService.updateHighLightHome(this.listItemSelected).subscribe(res => {
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
    }

    getIds() {
        const listIdVideo = [];
        const elements = this.listVideoRef.nativeElement.querySelectorAll('[data-selected="true"]');
        elements.forEach(element => {
            listIdVideo.push(element.getAttribute('data-item'));
        });
        return listIdVideo;
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.videosHighLight, event.previousIndex, event.currentIndex);
		let ids: any = [];
		ids = this.videosHighLight.map(i => i.id);
		console.log(ids);
		this.settingService.updateHighLightHome(ids).subscribe(res => {
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
    }

    reloadVideoHighLight() {
        this.getVideoHighLight();
    }

}
