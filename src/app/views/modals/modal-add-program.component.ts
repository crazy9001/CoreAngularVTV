import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-modal-add-program',
    templateUrl: './modal-add-program.component.html'
})
export class ModalAddProgramComponent implements OnInit {
    createProgramForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
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
            other_image: [null, null]
        });
    }
}
