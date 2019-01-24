import {Component, OnInit, Input, ViewChildren, QueryList, ElementRef, OnChanges} from '@angular/core';
import {environment} from './../../../environments/environment.prod';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-media-video-detail',
    templateUrl: './media-video-detail.component.html',
})
export class MediaVideoDetailComponent implements OnInit, OnChanges {

    videoUrl: string;
    id: number;
    environment: any;

    @Input() video;
    @Input() playVideo;
    @ViewChildren('videoPreview') videoPreview: QueryList<ElementRef>;

    constructor(
        private playerService: PlayerService
    ) {
        this.environment = environment;
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.playVideo = false;
    }

    eventPlayPreview() {
        this.playVideo = true;
        this.id = this.video.id;
        this.videoUrl = this.video.path;

        this.videoPreview.changes
            .filter(data => data.first)
            .map(data => data.first)
            .subscribe(element => {
                this.playerService.initPlayer(element.nativeElement, this.videoUrl);
            });
    }

}
