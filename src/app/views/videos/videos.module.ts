import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideosRoutingModule} from './videos-routing.module';
import {VideoDraftComponent} from './video-draft.component';
import { VideoCreateComponent } from './video-create.component';
import {ModalModule} from 'ngx-bootstrap';
import {ModalMediaVideoComponent} from '../media/modal-media-video.component';
import {TabsModule} from 'ngx-bootstrap/tabs';

import {environment} from './../../../environments/environment.prod';
import {DROPZONE_CONFIG, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import {MediaVideoDetailComponent} from '../media/media-video-detail.component';
import { PreviewVideoComponent } from './preview-video.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VideoEditorComponent } from './video-editor.component';
import { VideoPublishComponent } from './video-publish.component';
import { VideoPublishedComponent } from './video-published.component';
import { VideoEditComponent } from './video-edit.component';
import { VideoTrashedComponent } from './video-trashed.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {CONST} from './../../services/app-const';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ModalVideoHighlightComponent} from '../modals/modal-video-highlight.component';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const token = localStorage.getItem(CONST.STORE_TOKEN);
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: `${environment.api_url}/media/upload`,
    chunking: true,
    method: 'POST',
    maxFilesize: 2048,
    chunkSize: 2000000,
    acceptedFiles: 'image/*,.mp4',
    dictDefaultMessage : '<img src="assets/img/graphic-upload-area.svg" class="upload-aria"><div class="uploader-active-text">Drag and drop files here</div>',
    headers: {'Authorization': `Bearer ${token}`},
};

@NgModule({
    declarations: [
        VideoDraftComponent,
        VideoCreateComponent,
        ModalMediaVideoComponent,
        MediaVideoDetailComponent,
        PreviewVideoComponent,
        VideoEditorComponent,
        VideoPublishComponent,
        VideoPublishedComponent,
        VideoEditComponent,
        VideoTrashedComponent,
        ModalVideoHighlightComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VideosRoutingModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule,
        DropzoneModule,
        PerfectScrollbarModule,
        NgxInfiniteScrollerModule,
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})
export class VideosModule {
}
