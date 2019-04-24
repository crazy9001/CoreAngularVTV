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
import {PlayerService} from '../../services/player.service';

declare var $;

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
})
export class PostCreateComponent implements OnInit {

    createPostForm: FormGroup;
    categories: Array<ICategory>;
    environment: any;
    content = '<p></p>';
    oldImage = '';
    @ViewChild('container') container: ElementRef;
    @ViewChild('editorContainer') editorContainer: EditorContainerComponent;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private videoService: VideoService,
        private editorService: EditorService,
        private router: Router,
        private playerService: PlayerService
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
        const newHtml = this.editorService.GetDataForSave();
        const contentAfterprocess = this.editorService.ProcessInputContent(newHtml/*this.editorContainer.mediumEditor.getContent()*/);
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
        let html = '<div class="VCSortableInPreviewMode" type="photo" contenteditable="false">' +
            '<div>' +
            '<img src="' + this.environment.storage_url + data + '">' +
            '</div><div></div>' +
            '</div>';
        html = this.editorService.ProcessInputContent2(html);
        this.editorService.ProcessHTMLBeforInsert(html);
    }

    OutputIframe(data) {
        let html = '<div class="VCSortableInPreviewMode" type="Iframe" contenteditable="false">' +
            '<div>' +
             data +
            '</div><div></div>' +
            '</div>';
        html = this.editorService.ProcessInputContent2(html);
        this.editorService.ProcessHTMLBeforInsert(html);
    }

    OutputVideo($event) {
        if ($event.type === 'video') {
            let html = '<div class="VCSortableInPreviewMode" type="VideoStream" contenteditable="false" data-vid="' + $event.data.path + '" data-id="' + $event.data.id + '">' +
                '<div>' +
                '<video class="video-js vjs-big-play-centered" id="VideoPlayer_Init_' + $event.data.id + '"></video>' +
                '</div>' +
                '<div></div>' +
                '</div>';
            html = this.editorService.ProcessInputContent2(html);
            this.editorService.ProcessHTMLBeforInsert(html);
            const playerInstant = '#VideoPlayer_Init_' + $event.data.id;
            this.playerService.initPlayer(playerInstant, $event.data.path, 'video');
        } else {
            alert('Chức năng đang trong quá trình xây dựng. Sử dụng sau');
        }

    }
}
