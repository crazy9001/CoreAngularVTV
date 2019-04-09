import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    environment: any;
    thumbnails = '';
    idStorage: number;
    constructor() {
    }

    ngOnInit() {
        this.environment = environment;
    }

    eventReceiveImageInsert($event) {
        this.thumbnails = $event.thumbnails[2];
        this.idStorage = $event.id;
    }

}
