import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { EditorToolbarComponent } from './editor-toolbar.component';
import {MediaModule} from '../media/media.module';
import { EditorContainerComponent } from './editor-container.component';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import { AvatarComponent } from './avatar.component';
import { SeoInformationComponent } from './seo-information.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChildrenCategoryComponent } from './children-category.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [EditorToolbarComponent, EditorContainerComponent, AvatarComponent, SeoInformationComponent, ChildrenCategoryComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        PerfectScrollbarModule,
    ],
    exports: [
        EditorToolbarComponent,
        EditorContainerComponent,
        AvatarComponent,
        SeoInformationComponent,
        ChildrenCategoryComponent
    ]
})
export class ComponentsModule {
}
