import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {VideoPaginate} from '../../model/video-paginate.model';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-video-publish',
    templateUrl: './video-publish.component.html',
})
export class VideoPublishComponent implements OnInit {
    environment: any;
    videos: VideoPaginate;
    selectItem = false;
    selected: any;
    role: string;
    constructor(
        private videoService: VideoService,
        private router: Router,
        private authService: AuthService,
        private confirmationDialogService: ConfirmationDialogService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.getPublishVideo();
        this.role = this.authService.getRoleUser();
    }

    getPublishVideo() {
        this.videoService.getVideoPublish().then(videos => {
            this.videos = videos;
        });
    }

    prevPage() {
        this.videoService.getVideosAtUrl(this.videos.prev_page_url).then(videos => this.videos = videos);
    }

    nextPage() {
        this.videoService.getVideosAtUrl(this.videos.next_page_url).then(videos => this.videos = videos);
    }

    eventViewDetailVideo(id) {
        this.router.navigate(['videos/edit', id], {queryParams: id, skipLocationChange: true});
    }

    isActive(item) {
        return this.selected === item;
    }

    selectVideo(item) {
        this.selectItem = true;
        this.selected = item;
    }

    eventPublishItem() {
        this.confirmationDialogService.confirm('Xác nhận', 'Xuất bản video ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.publishVideo(this.selected.id).then(res => {
                        this.getPublishVideo();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    eventDeleteItem() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gỡ video xuống ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.removeVideo(this.selected.id).then(res => {
                        this.getPublishVideo();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

}
