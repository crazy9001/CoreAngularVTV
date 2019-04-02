import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import MediumEditor from 'medium-editor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import {HttpErrorResponse} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
})
export class PostCreateComponent implements OnInit, AfterViewInit {

    createPostForm: FormGroup;
    categories: Array<ICategory>;
    mediumEditor: any;
    thumbnails = '';
    environment: any;
    content = '<p></p>' +
        '<p><b>* Invite readers to follow the broadcast programs of Vtv world on ' +
        '<a href="https://beta.vtvworld.vtv.vn" target="_blank" title="VTV World" rel="nofollow">VTV World !</a>' +
        '</b></p>';
    idStorage: number;

    @ViewChild('container') container: ElementRef;

    ngAfterViewInit() {
        const element = this.container.nativeElement;
        this.mediumEditor = new MediumEditor(element, {
            toolbar: {
                allowMultiParagraphSelection: true,
                buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
                diffLeft: 0,
                diffTop: -10,
                firstButtonClass: 'medium-editor-button-first',
                lastButtonClass: 'medium-editor-button-last',
                relativeContainer: null,
                standardizeSelectionStart: false,
                static: false,
                align: 'center',
                sticky: false,
                updateOnEmptySelection: false
            }
        });
    }

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private videoService: VideoService,
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.getCategoryDefault();
        this.environment = environment;
    }

    createForm() {
        this.createPostForm = this.formBuilder.group({
            categories: ['', Validators.required],
            sub_categories: ['', ''],
            sub_title: ['', ''],
            title: ['', Validators.required],
            sub_description: ['', ''],
            description: ['', Validators.required],
            type: ['', Validators.required],
            publish_at: ['', Validators.required],
            seo_title: ['', ''],
            seo_keywords: ['', ''],
            seo_description: ['', ''],
            content: ['', ''],
            thumbnails: ['', Validators.required],
            storage_id: ['', ''],
        });
    }
    getCategoryDefault() {
        this.categoryService.getVideoCategoryByUser().then(category => {
            this.categories = category;
        });
    }

    onSubmit() {
        this.createPostForm.controls['content'].setValue(this.mediumEditor.getContent());
        console.log(this.createPostForm.value);

        this.videoService.createPost(this.createPostForm.value).subscribe(res => {
            this.createPostForm.reset();
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {
            }
        });
    }
    eventReceiveImageInsert($event) {
        this.thumbnails = $event.thumbnails[2];
        this.idStorage = $event.id;
        this.createPostForm.controls['thumbnails'].setValue($event.thumbnails[2]);
    }
}
