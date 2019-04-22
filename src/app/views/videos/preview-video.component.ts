import {Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {PlayerService} from '../../services/player.service';

@Component({
    selector: 'app-preview-video',
    templateUrl: './preview-video.component.html',
})
export class PreviewVideoComponent implements OnInit, OnChanges, OnDestroy {

    private _videoUrl = '';
    private _typeVideo = '';
    @Input() set urlVideoInsert(value: string) {
        this._videoUrl = value;
    }
    @Input() set typeVideo(value: string) {
        this._typeVideo = value;
    }
    get videoUrl() {
        return this._videoUrl;
    }
    get typeVideo() {
        return this._typeVideo;
    }
    constructor(
        private playerService: PlayerService
    ) {
    }

    ngOnInit() {
        if (this.videoUrl && this.videoUrl !== '') {
            this.playerService.initPlayer('preview_video_content', this.videoUrl, this.typeVideo);
        }
       // this.playerService.initPlayer('preview_video_content', this.videoUrl, this.typeVideo);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['urlVideoInsert'].isFirstChange() || !changes['typeVideo'].isFirstChange()) {
            this.playerService.initPlayer('preview_video_content', changes['urlVideoInsert'].currentValue, this.typeVideo);
        } /*else {
            console.log('case 2');
            this.typeVideo = changes['typeVideo'].currentValue;
            this.playerService.initPlayer('preview_video_content', changes['urlVideoInsert'].currentValue, this.typeVideo);
        }*/
    }
    ngOnDestroy() {
        this.playerService.dispose();
    }

}
