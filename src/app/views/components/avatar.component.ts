import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    environment: any;
    @Input() oldImage: string;
    @Output() dataOutputImage = new EventEmitter<string>();
    @Output() dataOutputStorage = new EventEmitter<string>();
    outputImage = '';
    constructor() {
    }

    ngOnInit() {
        this.environment = environment;
    }

    eventReceiveImageInsert($event) {
        this.outputImage = $event.thumbnails[2];
        this.dataOutputImage.emit($event.thumbnails[2]);
        this.dataOutputStorage.emit($event.id);
    }

}
