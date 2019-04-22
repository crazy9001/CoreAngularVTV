import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-modal-iframe',
    templateUrl: './modal-iframe.component.html',
    styleUrls: ['./modal-iframe.component.scss']
})
export class ModalIframeComponent implements OnInit {

    IframeOutputForm: FormGroup;

    @ViewChild('mediaIframe') public mediaIframe: ModalDirective;
    @Output() eventOutPutIframe = new EventEmitter<any>();
    constructor(
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.IframeOutputForm = this.formBuilder.group({
            content: ['', Validators.required],
        });
    }
    show() {
        this.mediaIframe.show();
    }

    hide() {
        this.mediaIframe.hide();
    }
    onSubmit() {
        this.eventOutPutIframe.emit(this.IframeOutputForm.controls['content'].value);
        this.hide();
        this.IframeOutputForm.reset();
    }

}
