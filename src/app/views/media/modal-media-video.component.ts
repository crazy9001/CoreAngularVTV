import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {MediaService} from '../../services/media.service';
import {MediaPaginateModel} from '../../model/media-paginate.model';
import {environment} from './../../../environments/environment.prod';

@Component({
    selector: 'app-modal-media-video',
    templateUrl: './modal-media-video.component.html',
    styleUrls: ['./modal-media-video.component.scss']
})
export class ModalMediaVideoComponent implements OnInit {
    @ViewChild('mediaVideoModal') public mediaVideoModal: ModalDirective;

    media: MediaPaginateModel;
    selected: any;
    environment: any;

    constructor(
        private mediaServide: MediaService
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.loadMedia();
    }

    show() {
        this.mediaVideoModal.show();
    }

    hide() {
        this.mediaVideoModal.hide();
    }

    isActive(item) {
        return this.selected === item;
    }

    loadMedia() {
        this.mediaServide.getMediaVideo().then(videos => this.media = videos);
    }

    prevPageMediaVideo() {
        this.mediaServide.getMediaAtUrl(this.media.files.prev_page_url).then(mediaVideo => this.media = mediaVideo);
    }

    nextPageMediaVideo() {
        this.mediaServide.getMediaAtUrl(this.media.files.next_page_url).then(mediaVideo => this.media = mediaVideo);
    }

    loadDetailVideoEvent(item) {
        this.selected = item;
    }
}
