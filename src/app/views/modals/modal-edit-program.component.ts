import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-modal-edit-program',
    templateUrl: './modal-edit-program.component.html'
})
export class ModalEditProgramComponent implements OnInit {

    editProgramForm: FormGroup;
    environment: any;

    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.environment = environment;
        this.createForm();
    }
    createForm() {
        this.editProgramForm = this.formBuilder.group({
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
}
