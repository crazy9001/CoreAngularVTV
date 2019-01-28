import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagerRoutingModule} from './manager-routing.module';
import {ProgramComponent} from './program.component';

@NgModule({
    declarations: [ProgramComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule
    ]
})
export class ManagerModule {
}
