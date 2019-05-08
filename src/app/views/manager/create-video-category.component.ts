import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment.prod';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
    selector: 'app-create-video-category',
    templateUrl: './create-video-category.component.html',
    styleUrls: ['./create-video-category.component.scss']
})
export class CreateVideoCategoryComponent implements OnInit {

    createCategoryForm: FormGroup;
    categories: Array<ICategory>;
    environment: any;
    categoryThumb = '';
    images: '';
    constructor(
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.createForm();
        this.getCategoryDefault();
    }
    createForm() {
        this.createCategoryForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            seo_title: ['', ''],
            seo_keywords: ['', ''],
            seo_description: ['', ''],
            parent_id: ['', ''],
            content: ['', '']
        });
    }
    getCategoryDefault() {
        this.categoryService.getAllCategory().then(category => {
            console.log(category);
            this.categories = category;
        });
    }

    eventReceiveImageInsert($event) {
        this.images = $event.path;
        this.categoryThumb = $event.path;
    }
    onSubmit() {
        this.ng4LoadingSpinnerService.show();
        this.categoryService.createVideoCategory(this.createCategoryForm.value).subscribe(res => {
            this.ng4LoadingSpinnerService.hide();
            this.getCategoryDefault();
            this.createCategoryForm.reset();
        });
        console.log(this.createCategoryForm.value);
    }

}
