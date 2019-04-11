import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import {HttpErrorResponse} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';
import {Router} from '@angular/router';
import {EditorContainerComponent} from '../components/editor-container.component';
import {EditorService} from '../../services/editor.service';

declare var $;

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
})
export class PostCreateComponent implements OnInit {

    createPostForm: FormGroup;
    categories: Array<ICategory>;
    environment: any;
    content = '<p></p>' +
        '<p><b>* Invite readers to follow the broadcast programs of Vtv world on ' +
        '<a href="https://beta.vtvworld.vtv.vn" target="_blank" title="VTV World" rel="nofollow">VTV World !</a>' +
        '</b></p>';
    oldImage = '';
    @ViewChild('container') container: ElementRef;
    @ViewChild('editorContainer') editorContainer: EditorContainerComponent;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private videoService: VideoService,
        private editorService: EditorService,
        private router: Router,
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
            storage_id: ['', Validators.required],
        });
    }

    getCategoryDefault() {
        this.categoryService.getVideoCategoryByUser().then(category => {
            this.categories = category;
        });
    }

    onSubmit() {
        const contentAfterprocess = this.editorService.ProcessInputContent(this.editorContainer.mediumEditor.getContent());
        this.createPostForm.controls['content'].setValue(contentAfterprocess);
        this.videoService.createPost(this.createPostForm.value).subscribe(res => {
            if (res.success === true) {
                this.router.navigate(['posts', res.data.id, 'edit']);
            }
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {
            }
        });
    }

    OutputAvatar(data) {
        this.createPostForm.controls['thumbnails'].setValue(data);
    }

    OutputStorage(data) {
        this.createPostForm.controls['storage_id'].setValue(data);
    }

    OutputImage(data) {
        const html = '<div class="VCSortableInPreviewMode" type="photo" contenteditable="false">' +
            '<div>' +
            '<img src="' + this.environment.storage_url + data + '"> ' +
            '</div>' +
            '<div class="PhotoCMS_Caption" contenteditable="false">' +
            '<p contenteditable="true" data-placeholder="[nhập chú thích]" class="NLPlaceholderShow"></p>' +
            '</div>' +
            '</div>';
        this.editorService.ProcessHTMLBeforInsert(html);
    }

    OutputVideo(data) {
        let html = '<div class="VCSortableInPreviewMode" type="VideoStream" contenteditable="false" data-vid="' + data.path + '">' +
            '<div style="width: 100%">' +
            '<video controls id="VideoPlayer_Init_' + data.id + '"> <source src="' + environment.storage_url + data.path + '" type="video/mp4"> </video>' +
            '</div>' +
            '<div></div>' +
            '</div>';
        html = this.editorService.ProcessInputContent2(html);
        this.editorService.ProcessHTMLBeforInsert(html);
    }
}
