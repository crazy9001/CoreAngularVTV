import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../../services/video.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment.prod';
import {NotificationService} from '../../services/notification.service';
import {AuthService} from '../../services/auth-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-video-edit',
    templateUrl: './video-edit.component.html',
})
export class VideoEditComponent implements OnInit, OnDestroy {
    environment: any;
    id: number;
    role: string;
    video = {
        id: '',
        content: '',
        title: '',
        description: '',
        publish_at: '',
        source: '',
        highlight: '',
        seo_title: '',
        seo_keywords: '',
        seo_description: '',
        thumbnails: '',
        category_id: '',
        storage_id: '',
        status: ''
    };
    editVideoForm: FormGroup;
    categories: Array<ICategory>;
    private sub: any;
    public thumbnails;

    constructor(
        private confirmationDialogService: ConfirmationDialogService,
        private route: ActivatedRoute,
        private videoService: VideoService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private authService: AuthService,
        private _location: Location
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.role = this.authService.getRoleUser();
        this.getCategory();
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getDetailVideo();
        this.createForm();
    }

    /* Get detail video by id */
    getDetailVideo() {
        this.videoService.getDetailVideoById(this.id).then(video => {
            this.video.id = video.id;
            this.video.content = video.content.content;
            this.video.category_id = video.category.id;
            this.video.title = video.title;
            this.video.description = video.description;
            this.video.publish_at = video.element.publish_at;
            this.video.source = video.source;
            this.video.highlight = video.highlight;
            this.video.seo_title = video.seo.seo_title;
            this.video.seo_description = video.seo.seo_description;
            this.video.seo_keywords = video.seo.seo_keywords;
            this.video.thumbnails = video.thumbnails;
            this.video.storage_id = video.storage[0].pivot.storage_id;
            this.thumbnails = Object.keys(video.storage[0].thumbnails).map(key => ({type: key, value: video.storage[0].thumbnails[key]}));
            this.video.status = video.status;
        });
    }

    /* Create form and validate */
    createForm() {
        this.editVideoForm = this.formBuilder.group({
            id: [null, [Validators.required]],
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            publish_at: [null, null],
            sub_category: [null, null],
            thumbnails: [null, [Validators.required]],
            tags: [null, null],
            source: [null, null],
            content: [null, [Validators.required]],
            storage_id: ['', null],
            seo_title: ['', null],
            seo_keywords: ['', null],
            seo_description: ['', null],
            highlight: ['', null],
            category_id: [null, [Validators.required]]
        });
    }

    /* Get default category */
    getCategory() {
        this.categoryService.getVideoCategoryByUser().then(category => {
            this.categories = category;
        });
    }

    /* Output video from media video */
    eventReceiveVideoInsert($event) {
        this.video.content = $event.path;
        this.video.storage_id = $event.id;
        this.thumbnails = Object.keys($event.thumbnails).map(key => ({type: key, value: $event.thumbnails[key]}));
    }

    /* Update video */
    eventUpdateVideo() {
        this.videoService.update(this.editVideoForm.value).subscribe(res => {
            this.notificationService.showSuccess('Đã cập nhật dữ liệu', 'Success');
        });
    }

    /* Update video to editor */
    eventVideoToEditor(id: number) {

        this.confirmationDialogService.confirm('Xác nhận', 'Gửi lên biên tập ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.changeVideoToEditor(id).then(res => {
                        this.notificationService.showSuccess('Gửi biên tập', 'Success');
                        this.backRoute();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    /* Update video to publish */
    eventVideoToPublish(id: number) {

        this.confirmationDialogService.confirm('Xác nhận', 'Gửi lên xuất bản ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.changeVideoToPublish(id).then(res => {
                        this.notificationService.showSuccess('Gửi xuất bản', 'Success');
                        this.backRoute();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    /* Publish video */
    eventPublishVideo(id: number) {

        this.confirmationDialogService.confirm('Xác nhận', 'Xuất bản video ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.publishVideo(id).then(res => {
                        this.notificationService.showSuccess('Đã xuất bản', 'Success');
                        this.backRoute();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    /* Remove video */
    eventRemoveVideo(id: number) {
        this.confirmationDialogService.confirm('Xác nhận', 'Gỡ video xuống ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.videoService.removeVideo(id).then(res => {
                        this.notificationService.showSuccess('Đã gỡ video', 'Success');
                        this.backRoute();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    backRoute() {
        this._location.back();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
