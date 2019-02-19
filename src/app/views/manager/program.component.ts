import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {environment} from '../../../environments/environment.prod';

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
})
export class ProgramComponent implements OnInit {

    listProgram: any;
    environment: any;

    constructor(
        private formBuilder: FormBuilder,
        private programService: ProgramService,
        public ngxSmartModalService: NgxSmartModalService,
    ) {
        this.environment = environment;
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
