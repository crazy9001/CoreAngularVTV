import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ICategory} from '../../model/type';
import {HttpErrorResponse} from '@angular/common/http';
import {VideoService} from '../../services/video.service';
import {environment} from '../../../environments/environment.prod';
import {Router} from '@angular/router';
import {EditorContainerComponent} from '../components/editor-container.component';
import * as rangy from 'rangy';

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
        const contentAfterprocess = this.ProcessInputContent(this.editorContainer.mediumEditor.getContent());
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

    ProcessInputContent(data) {
        const obj = $('<div>' + data + '</div>');
        $('#NLElementFunc', obj).remove();
        $('#NLFuncEnter', obj).remove();
        $('.PhotoCMS_Caption', obj).each(function () {
            $(this).attr('contenteditable', 'false');
            $('p', $(this)).length === 0 ? (
                $(this).html('<p contenteditable="true" data-placeholder="[nhập chú thích]">' + $.trim($(this).text()) + '</p>')
            ) : (
                $('p', $(this)).attr('contenteditable', true)
            );
            if ($(this).text() === '') {
                $('p', $(this)).remove();
                console.log($(this));
            } else {
                $('p', $(this)).attr('contenteditable', false);
            }
        });
        return obj.html();
    }

    OutputAvatar(data) {
        this.createPostForm.controls['thumbnails'].setValue(data);
    }

    OutputStorage(data) {
        this.createPostForm.controls['storage_id'].setValue(data);
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
        this.ProcessHTMLBeforInsert(html);
    }

    GetSelection = function () {
        return rangy.getSelection();
    };

    InsertHtmlAt (obj, html) {
        const selection = rangy.getSelection();
        if (selection.rangeCount > 0)  {
            selection.removeAllRanges();
        }
        const range = rangy.createRange();
        range.selectNode($(obj)[0]);
        selection.addRange(range);
        /*$(obj).remove();*/
        document.execCommand('insertHTML', true, html);
    }

    ProcessHTMLBeforInsert = (html) => {
        const _html = $('<div>' + html + '</div>');
        const type = _html[0].querySelector('.VCSortableInPreviewMode').getAttribute('type');
        const _ranges = this.GetSelection()._ranges;
        if (_ranges.length > 0) {
            const $commonAncestorContainer = $(_ranges[0].commonAncestorContainer);
            const selector = $commonAncestorContainer.parents('.VCSortableInPreviewMode[type="' + type + '"]');
            console.log(selector.length);
            if (selector.length === 0) {
                if ($commonAncestorContainer.is('p') && $commonAncestorContainer.parents('.VCSortableInPreviewMode').length === 0) {
                    console.log('insert case 0');
                    this.InsertHtmlAt($commonAncestorContainer, html + '<p></p>');
                    return;
                } else {
                    const $parent = $commonAncestorContainer.parent();
                    if ($parent.is('p') && $parent.parents('.VCSortableInPreviewMode').length === 0) {
                        console.log('insert case 1');
                        if ($parent.next().length === 0) {
                            $parent.after('<p></p>');
                        }
                        this.InsertHtmlAt($parent.next(), html);
                        return;
                    } else {
                        console.log('insert case 2');
                        document.execCommand('insertHTML', true, html);
                    }
                }
            }
        }
    }
}
