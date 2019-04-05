import {Component, OnInit} from '@angular/core';
import {VideoPaginate} from '../../model/video-paginate.model';
import {VideoService} from '../../services/video.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-post-published',
    templateUrl: './post-published.component.html'
})
export class PostPublishedComponent implements OnInit {
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
        this.getPublishedNews();
        this.role = this.authService.getRoleUser();
    }

    getPublishedNews() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.getNewsPublished().then(posts => {
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

    eventUnPublish() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gỡ bài xuống ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.ng4LoadingSpinnerService.show();
                    this.videoService.removeNews(this.selected.id).then(res => {
                        this.getPublishedNews();
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
