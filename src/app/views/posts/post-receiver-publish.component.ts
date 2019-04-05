import {Component, OnInit} from '@angular/core';
import {VideoPaginate} from '../../model/video-paginate.model';
import {VideoService} from '../../services/video.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-post-receiver-publish',
    templateUrl: './post-receiver-publish.component.html'
})
export class PostReceiverPublishComponent implements OnInit {

    environment: any;
    posts: VideoPaginate;
    selected: any;
    selectItem = false;
    role: string;
    selectItemStatus: string;

    constructor(
        private videoService: VideoService,
        private router: Router,
        private authService: AuthService,
        private confirmationDialogService: ConfirmationDialogService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.getReceiverPublishPost();
        this.role = this.authService.getRoleUser();
    }

    getReceiverPublishPost() {
        this.videoService.getReceiverNewsPublish().then(posts => {
            this.posts = posts;
        });
    }

    prevPage() {
        this.videoService.getVideosAtUrl(this.posts.prev_page_url).then(posts => this.posts = posts);
    }

    nextPage() {
        this.videoService.getVideosAtUrl(this.posts.next_page_url).then(posts => this.posts = posts);
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
                    this.videoService.changeNewsToPublish(this.selected.id).then(res => {
                        this.getReceiverPublishPost();
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
                    this.videoService.publishNews(this.selected.id).then(res => {
                        this.getReceiverPublishPost();
                        this.selectItem = false;
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
