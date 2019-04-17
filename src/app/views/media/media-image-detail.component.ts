import {Component, OnInit, Input} from '@angular/core';
import {environment} from './../../../environments/environment.prod';
@Component({
    selector: 'app-media-image-detail',
    templateUrl: './media-image-detail.component.html',
    styleUrls: ['./modal-media.component.scss']
})
export class MediaImageDetailComponent implements OnInit {

    private _image: any;
    environment: any;

    @Input() set image(value: object) {
        this._image = value;
    }

    constructor() {
    }

    get image() {
        return this._image;
    }

    ngOnInit() {
        this.environment = environment;
    }

}
