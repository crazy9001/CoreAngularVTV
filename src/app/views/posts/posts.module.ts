import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PostCreateComponent } from './post-create.component';
import {PostsRoutingModule} from './posts-routing.module';
import { MediumEditorModule } from 'angular2-medium-editor';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        PostCreateComponent
    ],
    imports: [
        CommonModule,
        MediumEditorModule,
        PerfectScrollbarModule,
        PostsRoutingModule,
    ]
})
export class PostsModule {
}
