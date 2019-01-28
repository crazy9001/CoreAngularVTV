import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProgramComponent} from './program.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Quản lý'
    },
    children: [
        {
            path: '',
            redirectTo: 'program'
        },
        {
            path: 'program',
            component: ProgramComponent,
            data: {
                title: 'Quản lý chương trình'
            }
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule {
}
