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

const token = localStorage.getItem('token');
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
        VideoEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VideosRoutingModule,
        ModalModule.forRoot(),
        TabsModule,
        DropzoneModule
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
})
export class VideosModule {
}
