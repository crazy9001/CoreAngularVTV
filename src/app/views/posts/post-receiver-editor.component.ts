import {Component, OnInit} from '@angular/core';
import {VideoPaginate} from '../../model/video-paginate.model';
import {VideoService} from '../../services/video.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-post-receiver-editor',
    templateUrl: './post-receiver-editor.component.html',
})
export class PostReceiverEditorComponent implements OnInit {

    posts: VideoPaginate;
    selected: any;
    selectItem = false;
    role: string;
    selectItemStatus: string;

    constructor(
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private videoService: VideoService,
        private router: Router,
        private authService: AuthService,
        private confirmationDialogService: ConfirmationDialogService,
    ) {
    }

    ngOnInit() {
        this.getReceiverEditorPost();
        this.role = this.authService.getRoleUser();
    }

    getReceiverEditorPost() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getReceiverNewsEditor().then(posts => {
            this.posts = posts;
            this.ng4LoadingSpinnerService.hide();
        });
    }

    prevPage() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getVideosAtUrl(this.posts.prev_page_url).then(
            posts => {
                this.posts = posts;
                this.ng4LoadingSpinnerService.hide();
            }
        );
    }

    nextPage() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getVideosAtUrl(this.posts.next_page_url).then(posts => {
            this.posts = posts;
            this.ng4LoadingSpinnerService.hide();
        });
    }

    isActive(item) {
        return this.selected === item;
    }

    eventSelectItem(item) {
        this.selectItem = true;
        this.selected = item;
        this.selectItemStatus = item.Status;
    }

    eventUnReceiver() {
        this.confirmationDialogService.confirm('Xác nhận', 'Nhả bài viết ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.ng4LoadingSpinnerService.show();
                    this.videoService.unReceiverPost(this.selected.id).then(res => {
                        if (res.success === true) {
                            this.getReceiverEditorPost();
                            this.selectItem = false;
                            this.ng4LoadingSpinnerService.hide();
                        }
                    }, (errorRes: HttpErrorResponse) => {

                    });
                }
            })
            .catch(() => {
            });
    }

    eventSentToPublish() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gửi xuất bản bài viết ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.changeNewsToPublish(this.selected.id).then(res => {
                        this.getReceiverEditorPost();
                        this.selectItem = false;
                    }, (errorRes: HttpErrorResponse) => {

                    });
                }
            })
            .catch(() => {
            });
    }

    eventPublish() {
        this.confirmationDialogService.confirm('Xác nhận', 'Xuất bản bài viết ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.ng4LoadingSpinnerService.show();
                    this.videoService.publishNews(this.selected.id).then(res => {
                        this.getReceiverEditorPost();
                        this.selectItem = false;
                        this.ng4LoadingSpinnerService.hide();
                    }, (errorRes: HttpErrorResponse) => {

                    });
                }
            })
            .catch(() => {
            });
    }

    eventClickEditNews() {
        this.router.navigate(['posts', this.selected.id, 'edit']);
    }

}
