import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {VideoService} from '../../services/video.service';
import {VideoPaginate} from '../../model/video-paginate.model';
import {Router} from '@angular/router';
@Component({
    selector: 'app-video-trashed',
    templateUrl: './video-trashed.component.html',
})
export class VideoTrashedComponent implements OnInit {

    environment: any;
    videos: VideoPaginate;

    constructor(
        private videoService: VideoService,
        private router: Router
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.getTrashedVideo();
    }

    getTrashedVideo() {
        this.videoService.getVideoTrashed().then(videos => {
            this.videos = videos;
        });
    }

    prevPage() {
        this.videoService.getVideosAtUrl(this.videos.prev_page_url).then(videos => this.videos = videos);
    }

    nextPage() {
        this.videoService.getVideosAtUrl(this.videos.next_page_url).then(videos => this.videos = videos);
    }

    eventViewDetailVideo(id) {
        this.router.navigate(['videos/edit', id], { queryParams: id, skipLocationChange: true});
    }

}
