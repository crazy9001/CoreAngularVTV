import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {Observable} from 'rxjs';
import {NotificationService} from '../../services/notification.service';

declare var $;

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
        private playerService: PlayerService,
        private notificationService: NotificationService
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
        this.videoService.getDetailNewsById(this.id).then(result => {
            console.log(result);
            if ( result.success === true) {
                if (result.data.Type === 'video') {
                    this.router.navigate(['404']);
                }
                this.post.id = result.data.id;
                this.post.Title = result.data.Title;
                this.post.Content = result.data.content.Content;
                this.post.Description = result.data.Description;
                this.post.SubDescription = result.data.Description;
                this.post.PublishAt = result.data.element.PublishAt;
                this.post.Source = result.data.Source;
                this.post.MetaTitle = result.data.seo.MetaTitle;
                this.post.MetaDescription = result.data.seo.MetaDescription;
                this.post.MetaKeyWord = result.data.seo.MetaKeyWords;
                this.post.Thumbnails = result.data.Thumbnails;
                this.post.Category = result.data.category.id;
                this.post.Type = result.data.Type;
                this.post.Status = result.data.Status;
                this.post.Storage = result.data.storage.id;
            }
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

    receiverPost() {
        this.videoService.receiverPost(this.id).then(res => {
        }, (errorRes: HttpErrorResponse) => {
        });
    }

    eventUpdatePost() {
        const newHtml = this.editorService.GetDataForSave();
        const contentAfterprocess = this.editorService.ProcessInputContent(newHtml/*this.editorContainer.mediumEditor.getContent()*/);
        this.editPostForm.controls['content'].setValue(contentAfterprocess);
        this.videoService.updatePost(this.editPostForm.value).subscribe(res => {
            console.log(res);
            if (res.success === true) {
                this.router.navigate(['posts', res.data.id, 'edit']);
            }
        }, (errorRes: HttpErrorResponse) => {
            console.log(errorRes);
            console.log(errorRes.error.message);
            console.log(this.notificationService.showError(errorRes.error.message, 'Error'));
            this.notificationService.showError(errorRes.error.message, 'Error');
            if (errorRes.status === 401) {
            }
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
