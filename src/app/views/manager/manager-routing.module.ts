import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProgramComponent} from './program.component';
import {MenuComponent} from './menu.component';
import {ProgramCreateComponent} from './program-create.component';
import { UsersComponent } from './users.component';
import {VideoCategoryComponent} from './video-category.component';

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
            children: [
                {
                    path: '',
                    component: ProgramComponent,
                    data: {
                        title: 'Quản lý chương trình'
                    },
                },
                {
                    path: 'create',
                    component: ProgramCreateComponent,
                    data: {
                        title: 'Thêm mới chương trình'
                    }
                }
            ]
        },
        {
            path: 'menu',
            component: MenuComponent,
            data: {
                title: 'Quản lý menu'
            }
        },
        {
            path: 'category',
            component: VideoCategoryComponent,
            data: {
                title: 'Chuyên mục'
            }
        },
        {
            path: 'users',
            component: UsersComponent,
            data: {
                title: 'Quản lý người dùng'
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
