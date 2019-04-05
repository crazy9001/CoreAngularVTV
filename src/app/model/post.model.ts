import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})

export class Post {
    id: number;
    Content: string;
    Title: string;
    Description: string;
    SubDescription: string;
    PublishAt: string;
    Source: string;
    MetaTitle: string;
    MetaKeyWord: string;
    MetaDescription: string;
    Thumbnails: string;
    Category: string;
    storage_id: string;
    Status: string;
    Type: string;
    Storage: string;
}
