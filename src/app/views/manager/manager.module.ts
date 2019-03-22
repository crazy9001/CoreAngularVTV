import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagerRoutingModule} from './manager-routing.module';
import {ProgramComponent} from './program.component';
import {MenuComponent} from './menu.component';
import {ProgramCreateComponent} from './program-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent} from './users.component';
import {ModalUserinfomationComponent} from '../modals/modal-userinfomation.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {ModalUserpasswordComponent} from '../modals/modal-userpassword.component';
import {ModalAdduserComponent} from '../modals/modal-adduser.component';
import { ModalAddProgramComponent } from '../modals/modal-add-program.component';
import {ModalModule, TabsModule} from 'ngx-bootstrap';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {CONST} from './../../services/app-const';
import {environment} from './../../../environments/environment.prod';
import {DROPZONE_CONFIG, DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MediaModule} from '../media/media.module';
import {ModalEditProgramComponent} from '../modals/modal-edit-program.component';

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
        ProgramComponent,
        MenuComponent,
        ProgramCreateComponent,
        UsersComponent,
        ModalUserinfomationComponent,
        ModalUserpasswordComponent,
        ModalAdduserComponent,
        ModalAddProgramComponent,
        ModalEditProgramComponent
    ]
    ,
    imports: [
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSmartModalModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule,
        DropzoneModule,
        PerfectScrollbarModule,
        MediaModule
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
export class ManagerModule {
}
