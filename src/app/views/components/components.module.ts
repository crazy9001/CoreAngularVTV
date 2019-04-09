import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { EditorToolbarComponent } from './editor-toolbar.component';
import {MediaModule} from '../media/media.module';
import { EditorContainerComponent } from './editor-container.component';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import { AvatarComponent } from './avatar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [EditorToolbarComponent, EditorContainerComponent, AvatarComponent],
    imports: [
        CommonModule,
        MediaModule,
        PerfectScrollbarModule,
    ],
    exports: [
        EditorToolbarComponent,
        EditorContainerComponent,
        AvatarComponent
    ]
})
export class ComponentsModule {
}
