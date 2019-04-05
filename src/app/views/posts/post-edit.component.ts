import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '../../services/video.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import MediumEditor from 'medium-editor';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth-service.service';

@Component({
    selector: 'app-post-edit',
    templateUrl: './post-edit.component.html'
})
export class PostEditComponent implements OnInit, AfterViewInit {

    @ViewChild('container') container: ElementRef;

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
    mediumEditor: any;
    constructor(
        private route: ActivatedRoute,
        private videoService: VideoService,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private router: Router,
        private authService: AuthService,
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

    ngAfterViewInit() {
        const element = this.container.nativeElement;
        this.mediumEditor = new MediumEditor(element, {
            placeholder: {
                text: '',
            },
            toolbar: {
                allowMultiParagraphSelection: true,
                buttons: [
                    {
                        name: 'bold',
                        attrs: {
                            'title': 'In đậm'
                        }
                    },
                    {
                        name: 'italic',
                        attrs: {
                            'title': 'In nghiêng'
                        }
                    },
                    {
                        name: 'underline',
                        attrs: {
                            'title': 'Gạch chân'
                        }
                    },
                    {
                        name: 'anchor',
                        contentDefault: '<b class=" fa fa-link"></b>',
                        attrs: {
                            'title': 'Chèn link'
                        }
                    },
                    {
                        name: 'justifyLeft',
                        contentDefault: '<b class="fa fa-align-left"></b>',
                        attrs: {
                            'title': 'Căn trái'
                        }
                    },
                    {
                        name: 'justifyCenter',
                        contentDefault: '<b class="fa fa-align-center"></b>',
                        attrs: {
                            'title': 'Căn giữa'
                        }
                    },
                    {
                        name: 'justifyRight',
                        contentDefault: '<b class="fa fa-align-right"></b>',
                        attrs: {
                            'title': 'Căn phải'
                        }
                    },
                    {
                        name: 'justifyFull',
                        contentDefault: '<b class="fa fa-align-justify"></b>',
                        attrs: {
                            'title': 'Căn đều hai bên'
                        }
                    }
                ],
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
            },
            anchor: {
                placeholderText: 'Dán hoặc nhập liên kết',
            }
        });
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
            this.post.Storage = post.storage[0].pivot.storage_id;
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

    receiverPost() {
        this.videoService.receiverPost(this.id).then(res => {
        }, (errorRes: HttpErrorResponse) => {
        });
    }

    eventReceiveImageInsert($event) {
        this.post.Thumbnails = $event.thumbnails[2];
        this.post.Storage = $event.id;
    }

    eventUpdatePost() {
        this.editPostForm.controls['content'].setValue(this.mediumEditor.getContent());
        this.videoService.update(this.editPostForm.value).subscribe(res => {
            this.router.navigate(['posts', res.id, 'edit']);
        });
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
