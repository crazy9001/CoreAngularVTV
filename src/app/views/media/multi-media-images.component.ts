import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {MediaPaginateModel} from '../../model/media-paginate.model';
import {MediaService} from '../../services/media.service';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-multi-media-images',
    templateUrl: './multi-media-images.component.html'
})
export class MultiMediaImagesComponent implements OnInit {

    @ViewChild('mediaImageMultipleModal') public mediaImageMultipleModal: ModalDirective;
    @Output() messageEventInsertImageMultiple = new EventEmitter<string>();
    media: MediaPaginateModel;
    environment: any;
    selected: any;
    loadDetail = false;

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
        this.mediaImageMultipleModal.show();
    }

    hide() {
        this.mediaImageMultipleModal.hide();
    }

    eventInsertImageMulty() {
        this.messageEventInsertImageMultiple.emit(this.selected);
        this.loadDetail = false;
        this.hide();
    }

    onUploadSuccess($event) {
        this.mediaService.getMediaImages();
    }

    reloadMediaImage() {
        this.loadMediaImages();
    }

}
