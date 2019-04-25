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
        fluid: true,
        /*controlBar: {
            volumePanel: {
                vertical: true,
                inline: false,
                volumeLevel: true
            }
        }*/
    };

    initPlayer(element?: string, url?: string, type?: string) {
        let src: any;
        let sources: any;
        if (type === 'video') {
            if ( environment.hls ) {
                src = environment.server_hls + url + '/playlist.m3u8';
            } else {
                src = environment.storage_url + url ;
            }
            sources = [
                {
                    'src': src
                }
            ];
        } else {
            sources = [
                {
                    'type': 'video/youtube',
                    'src': url
                }
            ];
        }
        this.player = videojs(element, this.controls);
        this.player.src(sources);
       // this.player.play();
    }

    dispose() {
        this.player.dispose();
    }
}
