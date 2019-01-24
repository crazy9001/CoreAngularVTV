import {Media} from './media';

export class MediaPaginateModel {
    files: {
        current_page: number;
        data: Media[];
        from: number;
        last_page: number;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: string;
        to: number;
        total: number;
    };
}
