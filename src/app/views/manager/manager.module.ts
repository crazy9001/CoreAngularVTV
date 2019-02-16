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
@NgModule({
    declarations: [
        ProgramComponent,
        MenuComponent,
        ProgramCreateComponent,
        UsersComponent,
        ModalUserinfomationComponent,
        ModalUserpasswordComponent,
        ModalAdduserComponent
    ]
    ,
    imports: [
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSmartModalModule.forRoot()
    ]
})
export class ManagerModule {
}
