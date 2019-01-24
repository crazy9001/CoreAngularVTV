import {Component, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-media-video',
    templateUrl: './media-video.component.html',
    styleUrls: ['./media-video.component.scss']
})
export class MediaVideoComponent implements OnInit {

    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;

    constructor() {
    }

    ngOnInit() {
    }

}
