import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-children-category',
    templateUrl: './children-category.component.html',
    styleUrls: ['./children-category.component.scss']
})
export class ChildrenCategoryComponent implements OnInit {

    private _category: any;
    @Input() set category(value: any) {
        this._category = value;
    }

    constructor() {
    }

    ngOnInit() {
        console.log(this._category);
    }

}
