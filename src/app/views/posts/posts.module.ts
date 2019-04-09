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
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MediaModule} from '../media/media.module';
import { PostDraftComponent } from './post-draft.component';
import { PostEditorComponent } from './post-editor.component';
import { PostPublishComponent } from './post-publish.component';
import { PostPublishedComponent } from './post-published.component';
import { PostEditComponent } from './post-edit.component';
import { PostReceiverEditorComponent } from './post-receiver-editor.component';
import { PostReceiverPublishComponent } from './post-receiver-publish.component';
import { PostListComponent } from './post-list.component';
import {ComponentsModule} from '../components/components.module';

@NgModule({
    declarations: [
        PostCreateComponent,
        PostDraftComponent,
        PostEditorComponent,
        PostPublishComponent,
        PostPublishedComponent,
        PostEditComponent,
        PostReceiverEditorComponent,
        PostReceiverPublishComponent,
        PostListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MediumEditorModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        PerfectScrollbarModule,
        PostsRoutingModule,
        MediaModule,
        ComponentsModule
    ]
})
export class PostsModule {
}
