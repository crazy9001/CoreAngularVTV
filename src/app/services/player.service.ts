import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment.prod';

declare var videojs: any;

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    player: any;

    constructor() {
    }

    private controls = {
        controls: true,
        height: 280,
        preload: true,
        controlBar: {
            volumePanel: {
                vertical: true,
                inline: false,
                volumeLevel: true
            }
        }
    };

    initPlayer(element?: string, url?: string) {
        this.player = videojs(element, this.controls);
        let source = '';
        if ( environment.hls ) {
            source = environment.server_hls + url + '/playlist.m3u8';
        } else {
            source = environment.storage_url + url ;
        }
        const sources = [{'src': source}];
        this.player.src(sources);
        this.player.play();
    }

    dispose() {
        this.player.dispose();
    }
}
