import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {environment} from '../../../environments/environment.prod';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {HttpErrorResponse} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
})
export class ProgramComponent implements OnInit {

    listProgram: any;
    environment: any;

    constructor(
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
        private formBuilder: FormBuilder,
        private programService: ProgramService,
        public ngxSmartModalService: NgxSmartModalService,
        private confirmationDialogService: ConfirmationDialogService,
    ) {
        this.environment = environment;
    }

    ngOnInit() {
        this.getAllProgram();
    }

    getAllProgram() {
        this.ng4LoadingSpinnerService.show();
        this.programService.getAllProgram().then(program => {
            this.listProgram = program;
            this.ng4LoadingSpinnerService.hide();
        });
    }

    eventReceiverAddProgram($event) {
        if ($event === 'true') {
            this.getAllProgram();
            this.ngxSmartModalService.getModal('popupAddProgram').close();
        }
    }

    eventDeleteProgram(id: number) {
        this.confirmationDialogService.confirm('Xác nhận', 'Xóa chương trình ?')
            .then((confirmed) => {
                if (confirmed) {
                    this.ng4LoadingSpinnerService.show();
                    this.programService.removeProgram(id).then(res => {
                        console.log(res);
                        this.getAllProgram();
                        this.ng4LoadingSpinnerService.hide();
                    }, (errorRes: HttpErrorResponse) => {
                    });
                }
            })
            .catch(() => {
            });
    }

    viewProgram(program) {
        console.log(program);
        this.ngxSmartModalService.getModal('popupEditProgram').open();
        this.ngxSmartModalService.resetModalData('popupEditProgram');
        this.ngxSmartModalService.setModalData(program, 'popupEditProgram');
    }

}
