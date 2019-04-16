import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {MediaService} from '../../services/media.service';
import {MediaPaginateModel} from '../../model/media-paginate.model';
import {environment} from './../../../environments/environment.prod';

@Component({
    selector: 'app-modal-media-video',
    templateUrl: './modal-media-video.component.html',
})
export class ModalMediaVideoComponent implements OnInit {
    @ViewChild('mediaVideoModal') public mediaVideoModal: ModalDirective;
    @Output() messageEventInsertVideo = new EventEmitter<string>();
    media: MediaPaginateModel;
    selected: any;
    environment: any;
    loadDetail = false;
    playVideo = false;
    configDropzone = {
        acceptedFiles: '.mp4',
    };
    constructor(
        private mediaServide: MediaService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
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
        this.loadDetail = true;
        this.playVideo = false;
        this.selected = item;
    }

    eventInsertVideo() {
        this.messageEventInsertVideo.emit({type: 'video', data: this.selected});
        this.loadDetail = false;
        this.hide();
    }

    onUploadSuccess($event) {
       // this.mediaServide.getMediaVideo();
    }

    reloadMediaVideo() {
        this.loadMedia();
    }
    eventOutputYoutubeLink($event) {
        this.messageEventInsertVideo.emit({type: 'embed', data: $event});
        this.hide();
    }

}
