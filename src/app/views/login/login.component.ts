import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    subScription: Subscription;
    errorCredentials = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private routerService: Router
    ) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    onSubmitLogin() {
        this.subScription = this.authService.login(this.loginForm.value).subscribe(res => {
            this.routerService.navigate(['dashboard']);
        }, (errorRes: HttpErrorResponse) => {
            if (errorRes.status === 401) {
                this.errorCredentials = true;
            }
        });
    }

    keyDownFunction($event) {
        if ($event.keyCode === 13) {
            this.onSubmitLogin();
        }
    }
}
