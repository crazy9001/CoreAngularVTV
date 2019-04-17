import {Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-preview-video',
    templateUrl: './preview-video.component.html',
})
export class PreviewVideoComponent implements OnInit, OnChanges, OnDestroy {

    private _videoUrl = '';

    @Input() set urlVideoInsert(value: string) {
        this._videoUrl = value;
    }

    get videoUrl() {
        return this._videoUrl;
    }

    constructor(
        private playerService: PlayerService
    ) {
    }

    ngOnInit() {
        if (this.videoUrl && this.videoUrl !== '') {
            this.playerService.initPlayer('preview_video_content', this.videoUrl);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['urlVideoInsert'].isFirstChange()) {
            this.playerService.initPlayer('preview_video_content', changes['urlVideoInsert'].currentValue);
        }
    }
    ngOnDestroy() {
        this.playerService.dispose();
    }

}
