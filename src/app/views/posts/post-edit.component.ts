import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '../../services/video.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth-service.service';
import {EditorContainerComponent} from '../components/editor-container.component';
import {EditorService} from '../../services/editor.service';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html'
})
export class PostEditComponent implements OnInit {

    @ViewChild('container') container: ElementRef;
    @ViewChild('editorContainer') editorContainer: EditorContainerComponent;
    editPostForm: FormGroup;
    categories: Array<ICategory>;
    id: number;
    role: string;

    post = {
        id: '',
        Content: '',
        Title: '',
        Description: '',
        SubDescription: '',
        PublishAt: '',
        Source: '',
        MetaTitle: '',
        MetaKeyWord: '',
        MetaDescription: '',
        Thumbnails: '',
        Category: '',
        storage_id: '',
        Status: '',
        Type: '',
        Storage: ''
    };
    private sub: any;
    environment: any;
    constructor(
        private route: ActivatedRoute,
        private videoService: VideoService,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private router: Router,
        private authService: AuthService,
        private editorService: EditorService,
        private playerService: PlayerService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getDetailNews();
        this.createForm();
        this.getCategoryDefault();
        this.environment = environment;
        this.role = this.authService.getRoleUser();
        this.receiverPost();
    }
    getDetailNews() {
        this.videoService.getDetailNewsById(this.id).then(post => {
            if (post.Type === 'video') {
                this.router.navigate(['404']);
            }
            this.post.id = post.id;
            this.post.Title = post.Title;
            this.post.Content = post.content.Content;
            this.post.Description = post.Description;
            this.post.SubDescription = post.Description;
            this.post.PublishAt = post.element.PublishAt;
            this.post.Source = post.Source;
            this.post.MetaTitle = post.seo.MetaTitle;
            this.post.MetaDescription = post.seo.MetaDescription;
            this.post.MetaKeyWord = post.seo.MetaKeyWords;
            this.post.Thumbnails = post.Thumbnails;
            this.post.Category = post.category.id;
            this.post.Type = post.Type;
            this.post.Status = post.Status;
            this.post.Storage = post.storage.id;
        });
    }

    createForm() {
        this.editPostForm = this.formBuilder.group({
            id: [null, [Validators.required]],
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
        this.categoryService.getVideoCategoryByUser().then(categories => {
            this.categories = categories;
        });
    }

    OutputImage(data) {
        const html =    '<div class="VCSortableInPreviewMode" type="photo" contenteditable="false">' +
            '<div>' +
            '<img src="' +  this.environment.storage_url + data + '"> ' +
            '</div>' +
            '<div class="PhotoCMS_Caption" contenteditable="false">' +
            '<p contenteditable="true" data-placeholder="[nhập chú thích]" class="NLPlaceholderShow"></p>' +
            '</div>'  +
            '</div>';
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
            let html = '<div class="VCSortableInPreviewMode" type="VideoStream" contenteditable="false" data-vid="' + $event.data.path + '">' +
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

    receiverPost() {
        this.videoService.receiverPost(this.id).then(res => {
        }, (errorRes: HttpErrorResponse) => {
        });
    }

    eventUpdatePost() {
        const contentAfterprocess = this.editorService.ProcessInputContent(this.editorContainer.mediumEditor.getContent());
        this.editPostForm.controls['content'].setValue(contentAfterprocess);
        this.videoService.update(this.editPostForm.value).subscribe(res => {
            this.router.navigate(['posts', res.id, 'edit']);
        });
    }

    OutputAvatar(data) {
        this.post.Thumbnails = data;
    }

    OutputStorage(data) {
        this.post.Storage = data;
    }

    eventSendToEditor(id: number) {
        this.videoService.changeNewsToEditor(id).then(res => {
            this.getDetailNews();
        }, (errorRes: HttpErrorResponse) => {

        });
    }

    eventSendToPublish(id: number) {
        this.videoService.changeNewsToPublish(id).then(res => {
            this.getDetailNews();
        }, (errorRes: HttpErrorResponse) => {

        });
    }

    eventPublish(id: number) {
        this.videoService.publishNews(id).then(res => {
            this.getDetailNews();
        }, (errorRes: HttpErrorResponse) => {

        });
    }

    eventDelete(id: number) {
        this.videoService.removeNews(id).then(res => {
            this.getDetailNews();
        }, (errorRes: HttpErrorResponse) => {
        });
    }

    eventUnPublish(id: number) {
        this.videoService.removeNews(id).then(res => {
            this.getDetailNews();
        }, (errorRes: HttpErrorResponse) => {
        });
    }
}
