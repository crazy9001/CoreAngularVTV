import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostCreateComponent} from './post-create.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Tin bài'
    },
    children: [
        {
            path: 'create',
            component: PostCreateComponent,
            data: {
                title: 'Viết bài mới'
            }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule {
}
