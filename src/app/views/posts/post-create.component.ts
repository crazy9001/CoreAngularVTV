import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import MediumEditor from 'medium-editor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import {HttpErrorResponse} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';
import {Router} from '@angular/router';

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
    dataOutputMultyImage: any;

    @ViewChild('container') container: ElementRef;

    ngAfterViewInit() {
        const element = this.container.nativeElement;
        this.mediumEditor = new MediumEditor(element, {
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

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private videoService: VideoService,
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
        this.videoService.createPost(this.createPostForm.value).subscribe(res => {
            this.router.navigate(['posts', res.id, 'edit']);
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {
            }
        });
    }
    eventReceiveImageInsert($event) {
        this.thumbnails = $event.thumbnails[2];
        this.idStorage = $event.id;
    }
}
