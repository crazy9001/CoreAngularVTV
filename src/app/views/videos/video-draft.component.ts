import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {VideoPaginate} from '../../model/video-paginate.model';
import {Router} from '@angular/router';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth-service.service';

@Component({
    selector: 'app-video-draft',
    templateUrl: './video-draft.component.html',
})
export class VideoDraftComponent implements OnInit {
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
        this.getDraftVideo();
        this.role = this.authService.getRoleUser();
    }

    getDraftVideo() {
        this.videoService.getVideoDraft().then(videos => {
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
                    this.videoService.removeVideo(this.selected.id).then(res => {
                        this.getDraftVideo();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    eventPublishItem() {
        this.confirmationDialogService.confirm('Xác nhận', 'Xuất bản video ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.publishVideo(this.selected.id).then(res => {
                        this.getDraftVideo();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    changeItemToPublish() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gửi lên xuất bản ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.changeVideoToPublish(this.selected.id).then(res => {
                        this.getDraftVideo();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    changeItemToEditor() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gửi lên biên tập ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.changeVideoToEditor(this.selected.id).then(res => {
                        this.getDraftVideo();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }
}
