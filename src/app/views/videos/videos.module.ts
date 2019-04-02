import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideosRoutingModule} from './videos-routing.module';
import {VideoDraftComponent} from './video-draft.component';
import { VideoCreateComponent } from './video-create.component';
import {ModalModule} from 'ngx-bootstrap';
import {ModalMediaVideoComponent} from '../media/modal-media-video.component';
import {TabsModule} from 'ngx-bootstrap/tabs';

import { PreviewVideoComponent } from './preview-video.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VideoEditorComponent } from './video-editor.component';
import { VideoPublishComponent } from './video-publish.component';
import { VideoPublishedComponent } from './video-published.component';
import { VideoEditComponent } from './video-edit.component';
import { VideoTrashedComponent } from './video-trashed.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ModalVideoHighlightComponent} from '../modals/modal-video-highlight.component';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
import {TimeAgoPipe} from 'time-ago-pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {ManagerModule} from '../manager/manager.module';
import {MediaModule} from '../media/media.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};



@NgModule({
    declarations: [
        VideoDraftComponent,
        VideoCreateComponent,
        PreviewVideoComponent,
        VideoEditorComponent,
        VideoPublishComponent,
        VideoPublishedComponent,
        VideoEditComponent,
        VideoTrashedComponent,
        ModalVideoHighlightComponent,
        TimeAgoPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VideosRoutingModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule,
        PerfectScrollbarModule,
        NgxInfiniteScrollerModule,
        DragDropModule,
        MediaModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})
export class VideosModule {
}
