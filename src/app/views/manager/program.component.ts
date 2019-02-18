import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICategory} from '../../model/type';
import {ProgramService} from '../../services/program.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
})
export class ProgramComponent implements OnInit {

    createFormProgram: FormGroup;
    listProgram: any;

    constructor(
        private formBuilder: FormBuilder,
        private programService: ProgramService,
        public ngxSmartModalService: NgxSmartModalService,
    ) {
    }

    ngOnInit() {
        this.getAllProgram();
    }

    getAllProgram() {
        this.programService.getAllProgram().then(program => {
            this.listProgram = program;
        });
    }

}
