import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {VideoPaginate} from '../../model/video-paginate.model';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalVideoHighlightComponent} from '../modals/modal-video-highlight.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-video-published',
    templateUrl: './video-published.component.html',
})
export class VideoPublishedComponent implements OnInit {

    @ViewChild('videoHighlightModal') videoHighlightModal: ModalVideoHighlightComponent;

    environment: any;
    videos: VideoPaginate;
    selectItem = false;
    selected: any;
    role: string;
    constructor(
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private videoService: VideoService,
        private router: Router,
        private authService: AuthService,
        private confirmationDialogService: ConfirmationDialogService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.getPublishedVideo();
        this.role = this.authService.getRoleUser();
    }

    getPublishedVideo() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getVideoPublished().then(videos => {
            this.videos = videos;
            this.ng4LoadingSpinnerService.hide();
        });
    }

    prevPage() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getVideosAtUrl(this.videos.prev_page_url).then(videos => {
            this.videos = videos;
            this.ng4LoadingSpinnerService.hide();
        });
    }

    nextPage() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getVideosAtUrl(this.videos.next_page_url).then(videos => {
            this.videos = videos;
            this.ng4LoadingSpinnerService.hide();
        });
    }

    eventViewDetailVideo(id) {
        this.router.navigate(['videos/edit', id], { queryParams: id, skipLocationChange: true});
    }

    isActive(item) {
        return this.selected === item;
    }

    selectVideo(item) {
        this.selectItem = true;
        this.selected = item;
    }

    eventDeleteItem() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gỡ video xuống ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.ng4LoadingSpinnerService.show();
                    this.videoService.removeVideo(this.selected.id).then(res => {
                        this.getPublishedVideo();
                        this.ng4LoadingSpinnerService.hide();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

}
