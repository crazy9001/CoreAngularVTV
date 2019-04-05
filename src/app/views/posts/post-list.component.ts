import {Component, OnInit, Input } from '@angular/core';
import {Post} from '../../model/post.model';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

    @Input() post: Post;
    environment: any;

    constructor() {
        this.environment = environment;
    }

    ngOnInit() {
    }

}
