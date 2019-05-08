import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.prod';
import {ICategory} from '../../model/type';

@Component({
    selector: 'app-edit-video-category',
    templateUrl: './edit-video-category.component.html',
    styleUrls: ['./edit-video-category.component.scss']
})
export class EditVideoCategoryComponent implements OnInit {
    id: number;
    private sub: any;
    editCategoryForm: FormGroup;
    environment: any;
    categories: Array<ICategory>;
    category = {
        id: '',
        name: '',
        description: '',
        seo_title: '',
        seo_keywords: '',
        seo_description: '',
        parent_id: '',
        content: '',
        attribute: '',
        active: ''
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.createForm();
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getCategoryDefault();
        this.getDetailCategory();
    }
    getCategoryDefault() {
        this.categoryService.getAllCategory().then(categories => {
            this.categories = categories;
        });
    }
    getDetailCategory() {
        this.categoryService.getDetailVideoCategory(this.id).then(result => {
            if (result.success === true) {
                this.category.id = result.data.id;
                this.category.name = result.data.name;
                this.category.description = result.data.description;
                this.category.seo_title = result.data.seo.MetaTitle;
                this.category.seo_keywords = result.data.seo.MetaKeywords;
                this.category.seo_description = result.data.seo.MetaDescription;
                this.category.attribute = result.data.attribute.images;
                this.category.content = result.data.content.Content;
                this.category.active = result.data.active;
                this.category.parent_id = result.data.parent_id;
            }
        });
    }
    createForm() {
        this.editCategoryForm = this.formBuilder.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            seo_title: ['', ''],
            seo_keywords: ['', ''],
            seo_description: ['', ''],
            parent_id: ['', ''],
            content: ['', '']
        });
    }
    eventReceiveImageInsert($event) {
        this.category.content = $event.path;
    }

    onSubmit() {
        this.categoryService.updateVideoCategory(this.editCategoryForm.value).subscribe(res => {
            console.log(res);
        });
    }
}
