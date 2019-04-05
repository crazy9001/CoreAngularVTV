import {Component, OnInit} from '@angular/core';
import {VideoPaginate} from '../../model/video-paginate.model';
import {VideoService} from '../../services/video.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html'
})
export class PostEditorComponent implements OnInit {
    posts: VideoPaginate;
    selected: any;
    selectItem = false;
    role: string;
    idUserLogin: any;
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
        this.getEditorPost();
        this.role = this.authService.getRoleUser();
        this.idUserLogin = this.authService.getIdUserCurent();
    }

    getEditorPost() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getNewsEditor().then(posts => {
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

    eventSentToPublish() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gửi xuất bản bài viết ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.ng4LoadingSpinnerService.show();
                    this.videoService.changeNewsToPublish(this.selected.id).then(res => {
                        this.getEditorPost();
                        this.selectItem = false;
                        this.ng4LoadingSpinnerService.hide();
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
                        this.getEditorPost();
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

    eventReceiver() {
        this.confirmationDialogService.confirm('Xác nhận', 'Nhận biên tập bài viết ?').then((confirmed) => {
            if (confirmed) {
                this.ng4LoadingSpinnerService.show();
                this.videoService.receiverPost(this.selected.id).then(res => {
                    if (res.success === true ) {
                        this.getEditorPost();
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

    eventGetBackEditor() {
        this.confirmationDialogService.confirm('Xác nhận', 'Rút lại bài viết ?').then((confirmed) => {
            if (confirmed) {
                this.ng4LoadingSpinnerService.show();
                this.videoService.getBackEditorPost(this.selected.id).then(res => {
                    if (res.success === true ) {
                        this.getEditorPost();
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

}
