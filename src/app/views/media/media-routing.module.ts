import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MediaVideoComponent} from './media-video.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Media'
        },
        children: [
            {
                path: '',
                redirectTo: 'video'
            },
            {
                path: 'video',
                component: MediaVideoComponent,
                data: {
                    title: 'Quản lý video'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MediaRoutingModule {
}
