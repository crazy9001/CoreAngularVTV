import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalMediaImagesComponent} from '../media/modal-media-images.component';
import {environment} from '../../../environments/environment.prod';
import {MultiMediaImagesComponent} from '../media/multi-media-images.component';
import {CategoryService} from '../../services/category.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-modal-add-program',
    templateUrl: './modal-add-program.component.html'
})
export class ModalAddProgramComponent implements OnInit {
    @ViewChild('mediaImageModal') mediaImageModal: ModalMediaImagesComponent;
    @ViewChild('mediaImageMultipleModal') mediaImageMultipleModal: MultiMediaImagesComponent;
    createProgramForm: FormGroup;
    imageInsert: any;
    lstImageInsert: string[] = [];
    environment: any;
    constructor(
        private formBuilder: FormBuilder,
        private categoryServide: CategoryService
    ) {
    }

    ngOnInit() {
        this.environment = environment;
        this.createForm();
    }
    createForm() {
        this.createProgramForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, null],
            active: [null, null],
            seo_title: ['', null],
            seo_keywords: ['', null],
            seo_description: ['', null],
            content: [null, [Validators.required]],
            images: [null, null]
        });
    }

    eventReceiveImageInsert($event) {
        this.imageInsert = $event.thumbnails[2];
    }

    eventReceiveImageMultipleInsert($event) {
        this.lstImageInsert.push($event.thumbnails[2]);
    }

    onSubmit() {
        this.categoryServide.createCategory(this.createProgramForm.value).subscribe(res => {
            this.createProgramForm.reset();
            this.lstImageInsert = [];
            this.imageInsert = '';
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
    }
}
