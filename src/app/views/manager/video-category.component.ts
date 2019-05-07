import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
declare var $;

@Component({
    selector: 'app-video-category',
    templateUrl: './video-category.component.html',
    styleUrls: ['./video-category.component.scss']
})
export class VideoCategoryComponent implements OnInit, AfterViewInit {

    listCategories: any;

    constructor(
        private videoCategoryServie: CategoryService
    ) {
    }

    ngOnInit() {
        this.loadListCategory();
    }
    ngAfterViewInit(): void {
        $('.dd').nestable({
            callback: function(l, e) {
                // l is the main container
                // e is the element that was moved
            }
        });
    }

    loadListCategory() {
        this.videoCategoryServie.getAllCategory().then((result) => {
            console.log(result);
            this.listCategories = result;
        });
    }
}
