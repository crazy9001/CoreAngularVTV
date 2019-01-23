import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideosRoutingModule} from './videos-routing.module';
import {VideoDraftComponent} from './video-draft.component';
import { VideoCreateComponent } from './video-create.component';

@NgModule({
    declarations: [
        VideoDraftComponent,
        VideoCreateComponent
    ],
    imports: [
        CommonModule,
        VideosRoutingModule
    ]
})
export class VideosModule {
}
