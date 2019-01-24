import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalMediaVideoComponent} from '../media/modal-media-video.component';

@Component({
    selector: 'app-video-create',
    templateUrl: './video-create.component.html',
    styleUrls: ['./video-create.component.scss']
})
export class VideoCreateComponent implements OnInit {

    @ViewChild('mediaVideoModal') mediaVideoModal: ModalMediaVideoComponent;

    constructor(
        private viewContainerRef: ViewContainerRef
    ) {
    }

    ngOnInit() {
    }

}
