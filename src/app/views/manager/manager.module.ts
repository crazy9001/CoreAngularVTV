import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagerRoutingModule} from './manager-routing.module';
import {ProgramComponent} from './program.component';
import {MenuComponent} from './menu.component';
import { ProgramCreateComponent } from './program-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [ProgramComponent, MenuComponent, ProgramCreateComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ManagerModule {
}
