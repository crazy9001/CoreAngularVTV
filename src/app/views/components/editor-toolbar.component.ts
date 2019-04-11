import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-editor-toolbar',
    templateUrl: './editor-toolbar.component.html'
})
export class EditorToolbarComponent implements OnInit {
    @Output() dataOutputImage = new EventEmitter<string>();
    @Output() dataOutputVideo = new EventEmitter<string>();

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

}
