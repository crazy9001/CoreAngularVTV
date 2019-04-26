import {Injectable} from '@angular/core';
import {environment} from './../../environments/environment.prod';

declare var videojs: any;

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    players: any;

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
        let arrayPlay = [];
        if (this.players) {
            arrayPlay = this.players;
        }
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
        const player = videojs(element, this.controls);
        player.src(sources);
        arrayPlay.push(player);
        this.players = arrayPlay;
    }

    dispose() {
        if ( this.players ) {
            this.players.forEach(function(player) {
                player.dispose();
            });
            this.players = null;
        }

    }
}
