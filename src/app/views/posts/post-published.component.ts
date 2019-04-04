import {Component, OnInit} from '@angular/core';
import {VideoPaginate} from '../../model/video-paginate.model';
import {VideoService} from '../../services/video.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-post-published',
    templateUrl: './post-published.component.html'
})
export class PostPublishedComponent implements OnInit {

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
        this.getPublishedNews();
        this.role = this.authService.getRoleUser();
    }

    getPublishedNews() {
        this.videoService.getNewsPublished().then(posts => {
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

    eventUnPublish() {
        this.confirmationDialogService.confirm('Xác nhận', 'Gỡ bài xuống ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.removeNews(this.selected.id).then(res => {
                        this.getPublishedNews();
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
