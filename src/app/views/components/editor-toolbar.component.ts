import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-editor-toolbar',
    templateUrl: './editor-toolbar.component.html'
})
export class EditorToolbarComponent implements OnInit {
    @Output() dataOutputImage = new EventEmitter<any>();
    @Output() dataOutputVideo = new EventEmitter<any>();
    @Output() dataOutputIframe = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    eventReceiveImageInsert($event) {
        this.dataOutputImage.emit($event.thumbnails[2]);
    }

    eventReceiveVideoInsert($event) {
        this.dataOutputVideo.emit($event);
    }

    eventReceiveIframe($event) {
        this.dataOutputIframe.emit($event);
    }

}
