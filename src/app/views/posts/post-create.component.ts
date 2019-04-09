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
export class PostCreateComponent implements OnInit {

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
    @ViewChild('preViewMode') preViewMode: ElementRef;


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

    OutputImage(data) {
        const html =    '<div class="VCSortableInPreviewMode" type="photo" contenteditable="false">' +
                            '<div>' +
                                '<img src="' +  this.environment.storage_url + data + '"> ' +
                            '</div>' +
                            '<div class="PhotoCMS_Caption" contenteditable="false">' +
                                '<p contenteditable="true" data-placeholder="[nhập chú thích]" class="NLPlaceholderShow"></p>' +
                            '</div>'  +
                        '</div>';
        document.execCommand('insertHTML', true, html);
        const _this = this;

        $('#NLEditor .VCSortableInPreviewMode').unbind('mouseenter mouseleave');
        $('#NLEditor .VCSortableInPreviewMode').off('mouseenter mouseleave');
        $('#NLEditor .VCSortableInPreviewMode').hover(function (evt) {
            const $this = $(this);
            $this.addClass('active');
            _this.ShowFunctions($this);
        }, function () {
            $('#NLElementFunc').hide();
            $('#NLFuncEnter').hide();
        });
    }

    ShowFunctions(obj) {
        const NL = this;
        const type = $(obj).attr('type');
        let func = '';
        $('#NLEditor > br').remove();

        func += this.GetObjectFunction(obj, type);
        const divEnter = '<div id="NLFuncEnter" contenteditable="false" title="Tạo dòng mới"></div>';
        $('#NLElementFunc').remove();
        $('#NLFuncEnter').remove();
        $(obj).append(func);
        $(obj).append(divEnter);

    }

    GetObjectFunction(obj, type) {
        let func = '<div id="NLElementFunc" contenteditable="false" class="NLNoTrackChange" style="left: 245px"><ul>';
        switch (type) {
            case 'photo':
                func += '<li data-func="photo-edit" title="Chỉnh sửa ảnh"><i class="fa fa-object-group"></i></li>';
                func += '<li data-func="elm-remove" title="Xóa"><i class="fa fa-remove"></i></li>';
                break;
            default:
                func += '<li data-func="elm-cog" title="Cấu hình"><i class="fa fa-cog"></i></li>';
                break;
        }
        func += '</ul></div>';
        return func;
    }
}
