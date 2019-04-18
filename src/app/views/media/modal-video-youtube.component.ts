import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-modal-video-youtube',
    templateUrl: './modal-video-youtube.component.html',
    styleUrls: ['./modal-video-youtube.component.scss']
})
export class ModalVideoYoutubeComponent implements OnInit {

    embedOutputForm: FormGroup;

    @ViewChild('mediaVideoYoutube') public mediaVideoYoutube: ModalDirective;
    @Output() messageEventOutputVideoYoutube = new EventEmitter<any>();
    constructor(
        private formBuilder: FormBuilder,
        private _sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.embedOutputForm = this.formBuilder.group({
            link: ['', Validators.required],
        });
    }
    onSubmit() {
        const link = this.embedOutputForm.controls['link'].value;
        const idYoutube = this.ytVidId(link);
        const thumbnails = [
            'https://img.youtube.com/vi/' + idYoutube + '/hqdefault.jpg',
        ];
        this.messageEventOutputVideoYoutube.emit({path: link, thumbnails: thumbnails});
        this.hide();
        this.embedOutputForm.reset();
    }
    show() {
        this.mediaVideoYoutube.show();
    }

    hide() {
        this.mediaVideoYoutube.hide();
    }

    ytVidId(url) {
        const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false;
    }
}
