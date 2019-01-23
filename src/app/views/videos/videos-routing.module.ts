import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoDraftComponent} from './video-draft.component';
import {VideoCreateComponent} from './video-create.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Video'
    },
    children: [
        {
            path: '',
            redirectTo: 'draft'
        },
        {
            path: 'create',
            component: VideoCreateComponent,
            data: {
                title: 'Thêm mới video'
            }
        },
        {
            path: 'draft',
            component: VideoDraftComponent,
            data: {
                title: 'Lưu tạm'
            }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideosRoutingModule {
}
