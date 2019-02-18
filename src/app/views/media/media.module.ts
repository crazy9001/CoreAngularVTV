import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MediaVideoComponent} from './media-video.component';
import {ModalModule} from 'ngx-bootstrap';
import {MediaRoutingModule} from './media-routing.module';
import {ModalMediaVideoComponent} from './modal-media-video.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { MediaVideoDetailComponent } from './media-video-detail.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {environment} from './../../../environments/environment.prod';
import {CONST} from './../../services/app-const';
import { ModalMediaImagesComponent } from './modal-media-images.component';
import { MediaImageDetailComponent } from './media-image-detail.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: `${environment.api_url}/media/upload`,
    chunking: true,
    method: 'POST',
    maxFilesize: 2048,
    chunkSize: 2000000,
    acceptedFiles: 'image/*,.mp4',
    dictDefaultMessage : '<img src="assets/img/graphic-upload-area.svg" class="upload-aria"><div class="uploader-active-text">Drag and drop files here</div>',
    headers: {'Authorization': `Bearer ${CONST.STORE_TOKEN}`},
};

@NgModule({
    declarations: [
        MediaVideoComponent,
        ModalMediaVideoComponent,
        MediaVideoDetailComponent,
        ModalMediaImagesComponent,
        MediaImageDetailComponent
    ],
    imports: [
        CommonModule,
        DropzoneModule,
        MediaRoutingModule,
        ModalModule.forRoot(),
        TabsModule,
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    exports: []
})
export class MediaModule {
}
