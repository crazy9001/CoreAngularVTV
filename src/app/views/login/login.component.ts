import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {NotificationService} from '../../services/notification.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    subScription: Subscription;
    errorCredentials = false;
    template: string = '<div class="CMSLoading"></div>';
    constructor(
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private routerService: Router,
        private notificationService: NotificationService
    ) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    onSubmitLogin() {
        this.ng4LoadingSpinnerService.show();
        this.subScription = this.authService.login(this.loginForm.value).subscribe(res => {
            this.ng4LoadingSpinnerService.hide();
            this.routerService.navigate(['dashboard']);
        }, (errorRes: HttpErrorResponse) => {
            this.notificationService.showError(errorRes.error.error, 'Error');
            if (errorRes.status === 401) {
                this.ng4LoadingSpinnerService.hide();
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
