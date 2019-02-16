import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-modal-userpassword',
    templateUrl: './modal-userpassword.component.html'
})
export class ModalUserpasswordComponent implements OnInit {
    userForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private userService: UsersService
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            id: [null, null],
            password: [null, [Validators.required]],
        });
    }

    onSubmit() {
        this.userService.changePasswordUser(this.userForm.value).subscribe(res => {
            console.log(res);
            this.userForm.reset();
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {

            }
        });
    }

}
