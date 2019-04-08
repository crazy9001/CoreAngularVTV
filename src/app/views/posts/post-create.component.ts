import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import MediumEditor from 'medium-editor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import {HttpErrorResponse} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';
import {Router} from '@angular/router';
declare var $;

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
    isHovering = false;

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
            if (res.success === true) {
                this.router.navigate(['posts', res.data.id, 'edit']);
            }
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {
            }
        });
    }
    eventReceiveImageInsert($event) {
        this.thumbnails = $event.thumbnails[2];
        this.idStorage = $event.id;
    }


    eventReceiveImageMultipleInsert($event) {
        const html =    '<div class="VCSortableInPreviewMode" type="photo" contenteditable="false"  (mouseenter)="mouseHovering()" (mouseleave)="mouseLeft()">' +
                            '<div>' +
                                '<img src="' +  this.environment.storage_url + $event.thumbnails[2] + '"> ' +
                            '</div>' +
                            '<div class="PhotoCMS_Caption" contenteditable="false">' +
                                '<p contenteditable="true" data-placeholder="[nhập chú thích]" class="NLPlaceholderShow"></p>' +
                            '</div>' +
                            '<div id="NLElementFunc" contenteditable="false" class="NLNoTrackChange" style="left: 245px;width: 165px;display: block;"><ul><li data-func="elm-cog" title="Cấu hình"><i class="fa fa-cog"></i></li><li data-func="photo-edit" title="Chỉnh sửa ảnh"><i class="fa fa-object-group"></i></li><li data-func="photo-watermark" title="Đóng logo"><i class="fa fa-copyright"></i></li><li data-func="elm-line-before" title="Tạo dòng bên trên"><i class="fa fa-chevron-up"></i></li><li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li></ul></div>' +
                            '<div id="NLFuncEnter" contenteditable="false" title="Tạo dòng mới" style="display: block;"></div>' +
                        '</div>';
        MediumEditor.util.insertHTMLCommand(window.document, html);
    }

    mouseHovering() {
        this.isHovering = true;
        console.log(this.isHovering);
    }

    mouseLeaving() {
        this.isHovering = false;
    }
}
