import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostCreateComponent} from './post-create.component';
import {PostDraftComponent} from './post-draft.component';
import {PostEditorComponent} from './post-editor.component';
import {PostPublishComponent} from './post-publish.component';
import {PostPublishedComponent} from './post-published.component';

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
        },
        {
            path: 'draft',
            component: PostDraftComponent,
            data: {
                title: 'Bài lưu tạm'
            }
        },
        {
            path: 'editor',
            component: PostEditorComponent,
            data: {
                title: 'Bài chờ biên tập'
            }
        },
        {
            path: 'publish',
            component: PostPublishComponent,
            data: {
                title: 'Bài chờ xuất bản'
            }
        },
        {
            path: 'published',
            component: PostPublishedComponent,
            data: {
                title: 'Bài đã xuất bản'
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
