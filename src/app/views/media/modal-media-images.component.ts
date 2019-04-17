import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MediaPaginateModel} from '../../model/media-paginate.model';
import {MediaService} from '../../services/media.service';
import {environment} from '../../../environments/environment.prod';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-modal-media-images',
    templateUrl: './modal-media-images.component.html',
    styleUrls: ['./modal-media.component.scss']
})
export class ModalMediaImagesComponent implements OnInit {
    @ViewChild('mediaImageModal') public mediaImageModal: ModalDirective;
    @Output() messageEventInsertImage = new EventEmitter<any>();
    media: MediaPaginateModel;
    environment: any;
    selected: any;
    loadDetail = false;
    configDropzone = {
        acceptedFiles: 'image/*',
    };
    constructor(
        private mediaService: MediaService
    ) {
    }

    ngOnInit() {
        this.environment = environment;
    }

    loadMediaImages() {
        this.mediaService.getMediaImages().then(media => this.media = media);
    }

    prevPageMedia() {
        this.mediaService.getMediaAtUrl(this.media.files.prev_page_url).then(mediaImage => this.media = mediaImage);
    }

    nextPageMedia() {
        this.mediaService.getMediaAtUrl(this.media.files.next_page_url).then(mediaImage => this.media = mediaImage);
    }

    isActive(item) {
        return this.selected === item;
    }

    loadDetailImageEvent(item) {
        this.loadDetail = true;
        this.selected = item;
    }

    show() {
        this.mediaImageModal.show();
    }

    hide() {
        this.mediaImageModal.hide();
    }

    eventInsertImage() {
        this.messageEventInsertImage.emit(this.selected);
        this.loadDetail = false;
        this.hide();
    }

    onUploadSuccess($event) {
       // this.mediaService.getMediaImages();
    }

    reloadMediaImage() {
        this.loadMediaImages();
    }
}
