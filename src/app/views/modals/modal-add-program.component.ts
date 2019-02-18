import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalMediaImagesComponent} from '../media/modal-media-images.component';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-modal-add-program',
    templateUrl: './modal-add-program.component.html'
})
export class ModalAddProgramComponent implements OnInit {
    @ViewChild('mediaImageModal') mediaImageModal: ModalMediaImagesComponent;
    createProgramForm: FormGroup;
    imageInsert: any;
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

    eventReceiveImageInsert($event) {
        console.log($event);
        this.imageInsert = $event.path;
    }
}
