import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalMediaVideoComponent} from '../media/modal-media-video.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-video-create',
    templateUrl: './video-create.component.html',
})
export class VideoCreateComponent implements OnInit {

    @ViewChild('mediaVideoModal') mediaVideoModal: ModalMediaVideoComponent;
    urlVideoInsert: string;
    idStorage: number;
    listThumbs: any;
    environment: any;
    createVideoForm: FormGroup;
    categories: Array<ICategory>;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private formBuilder: FormBuilder,
        private videoService: VideoService,
        private categoryService: CategoryService
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.createForm();
        this.getCategoryDefault();
    }

    eventReceiveVideoInsert($event) {
        this.urlVideoInsert = $event.path;
        this.idStorage = $event.id;
        this.listThumbs = Object.keys($event.thumbnails).map(key => ({type: key, value: $event.thumbnails[key]}));
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
            storage_id: ['', null],
            seo_title: ['', null],
            seo_keywords: ['', null],
            seo_description: ['', null],
            highlight: ['', null],
            category_id: [null, null]
        });
    }
    getCategoryDefault() {
        this.categoryService.getVideoCategoryByUser().then(category => {
            this.categories = category;
        });
    }
    onSubmit() {
        this.videoService.create(this.createVideoForm.value).subscribe(res => {
            this.createVideoForm.reset();
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
    }
}
