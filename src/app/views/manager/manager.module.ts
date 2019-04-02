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
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MediaModule} from '../media/media.module';
import {ModalEditProgramComponent} from '../modals/modal-edit-program.component';
import {ModalUserPermissionComponent} from '../modals/modal-user-permission.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
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
        ModalEditProgramComponent,
        ModalUserPermissionComponent
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
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
})
export class ManagerModule {
}
