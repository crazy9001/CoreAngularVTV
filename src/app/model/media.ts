import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class Media {
    id: number;
    user_id: number;
    folder_id: number;
    mime_type: string;
    file_name: string;
    name: string;
    size: number;
    path: string;
    thumbnails: string;
    files: object;
    progress: number;
}
