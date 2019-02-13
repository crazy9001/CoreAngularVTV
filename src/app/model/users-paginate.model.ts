import {Users} from './users.model'
export class UsersPaginate {
    current_page: number;
    data: Users[];
    from: number;
    last_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}
