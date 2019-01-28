import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoDraftComponent} from './video-draft.component';
import {VideoCreateComponent} from './video-create.component';
import {VideoEditorComponent} from './video-editor.component';
import {VideoPublishComponent} from './video-publish.component';
import {VideoPublishedComponent} from './video-published.component';
import {VideoEditComponent} from './video-edit.component';
import {VideoTrashedComponent} from './video-trashed.component';

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
        },
        {
            path: 'editor',
            component: VideoEditorComponent,
            data: {
                title: 'Chờ biên tập'
            }
        },
        {
            path: 'publish',
            component: VideoPublishComponent,
            data: {
                title: 'Chờ xuất bản'
            }
        },
        {
            path: 'published',
            component: VideoPublishedComponent,
            data: {
                title: 'Đã xuất bản'
            }
        },
        {
            path: 'trashed',
            component: VideoTrashedComponent,
            data: {
                title: 'Bị gỡ xuống'
            }
        },
        {
            path: 'edit/:id',
            component: VideoEditComponent,
            data: {
                title: 'Cập nhật video'
            }
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VideosRoutingModule {
}
