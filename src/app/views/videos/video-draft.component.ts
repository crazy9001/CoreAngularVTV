import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {VideoPaginate} from '../../model/video-paginate.model';
@Component({
    selector: 'app-video-draft',
    templateUrl: './video-draft.component.html',
})
export class VideoDraftComponent implements OnInit {
    environment: any;
    videos: VideoPaginate;
    constructor(
        private videoService: VideoService
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.getDraftVideo();
    }

    getDraftVideo() {
        this.videoService.getVideoDraft().then(videos => {
            this.videos = videos;
        });
    }
}
