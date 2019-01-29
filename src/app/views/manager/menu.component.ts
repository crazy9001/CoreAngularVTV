import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {MenuService} from '../../services/menu.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

    createFormMenu: FormGroup;
    typeIn = true;
    categories: Array<ICategory>;
    listMenu: any;
    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private menuService: MenuService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.getCategoryDefault();
        this.defaultMenu();
    }

    createForm() {
        this.createFormMenu = this.formBuilder.group({
            name: [null, [Validators.required]],
            link_type: [null, [Validators.required]],
            category: [null, null],
            link: [null, null],
            status: [null, null],
            position: [null, null],
            blank_type: [null, null],
        });
    }

    defaultMenu () {
        this.menuService.getAllMenu().then(menu => {
            console.log(menu);
            this.listMenu = menu;
        });
    }
    onSubmit() {
        console.log(this.createFormMenu.value);
        this.menuService.create(this.createFormMenu.value).subscribe(res => {
            this.createFormMenu.reset();
            this.defaultMenu();
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
    }

    getCategoryDefault() {
        this.categoryService.getVideoCategoryByUser().then(category => {
            this.categories = category;
        });
    }

    menuTypeChange(value) {
        if (value === 'in') {
            this.typeIn = true;
        } else {
            this.typeIn = false;
        }
    }
}
