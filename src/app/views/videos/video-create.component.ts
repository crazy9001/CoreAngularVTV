import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalMediaVideoComponent} from '../media/modal-media-video.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalMediaImagesComponent} from '../media/modal-media-images.component';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-video-create',
    templateUrl: './video-create.component.html',
})
export class VideoCreateComponent implements OnInit {

    @ViewChild('mediaVideoModal') mediaVideoModal: ModalMediaVideoComponent;
    @ViewChild('mediaImageModal') mediaImageModal: ModalMediaImagesComponent;
    urlVideoInsert: string;
    idStorage: number;
    storageThumbnails: any;
    environment: any;
    createVideoForm: FormGroup;
    categories: Array<ICategory>;
    programs: Array<ICategory>;
    customThumb = '';
    typeVideo: string;

    constructor(
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private viewContainerRef: ViewContainerRef,
        private formBuilder: FormBuilder,
        private videoService: VideoService,
        private categoryService: CategoryService,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.ng4LoadingSpinnerService.show();
        this.createForm();
        this.getCategoryDefault();
        this.getProgramDefault();
        this.ng4LoadingSpinnerService.hide();
    }

    eventReceiveVideoInsert($event) {
        this.typeVideo = $event.type;
        this.urlVideoInsert = $event.data.path;
        this.storageThumbnails = $event.data.thumbnails;
        if ($event.type === 'video') {
            this.idStorage = $event.data.id;
        } else {
            this.idStorage = 0;
        }
    }

    createForm() {
        this.createVideoForm = this.formBuilder.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            publish_at: [null, null],
            sub_category: [null, null],
            thumbnails: [null, [Validators.required]],
            tags: [null, null],
            source: [null, null],
            content: [null, [Validators.required]],
            storage_id: [0, null],
            seo_title: ['', null],
            seo_keywords: ['', null],
            seo_description: ['', null],
            highlight: ['', null],
            categories: [null, null],
            type: ['', '']
        });
    }

    getCategoryDefault() {
        this.categoryService.getVideoCategoryByUser().then(category => {
            this.categories = category;
        });
    }

    getProgramDefault() {
        this.categoryService.getProgramByUser().then(programs => {
            this.programs = programs;
        });
    }

    onSubmit() {
        this.ng4LoadingSpinnerService.show();
        this.videoService.create(this.createVideoForm.value).subscribe(res => {
            this.ng4LoadingSpinnerService.hide();
            this.createVideoForm.reset();
            this.router.navigate(['/videos/draft']);
        }, (errorRes: HttpErrorResponse) => {
            this.notificationService.showError(errorRes.error.error, 'Error');
            if (errorRes.status === 401) {

            }
        });
    }

    eventReceiveImageInsert(event) {
        if (event) {
            this.customThumb = event.thumbnails[0];
            this.createVideoForm.controls['thumbnails'].setValue(event.thumbnails[0]);
        }

    }
}
