import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment.prod';
import {UsersService} from '../../services/users.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-modal-adduser',
    templateUrl: './modal-adduser.component.html',
})
export class ModalAdduserComponent implements OnInit {
    createUserForm: FormGroup;
    environment: any;
    @Output() messageEventAddUser = new EventEmitter<string>();
    constructor(
        private formBuilder: FormBuilder,
        private userSerrvice: UsersService
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.createUserForm = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            name: [null, [Validators.required]],
            email: [null, [Validators.required]],
        });
    }
    onSubmit() {
        this.userSerrvice.create(this.createUserForm.value).subscribe(res => {
            this.createUserForm.reset();
            this.messageEventAddUser.emit('true');
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
        console.log(this.createUserForm.value);
    }
}
