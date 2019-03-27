import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {ICategory} from '../../model/type';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-modal-user-permission',
    templateUrl: './modal-user-permission.component.html'
})
export class ModalUserPermissionComponent implements OnInit {
    permissionUserForm: FormGroup;
    categories: Array<ICategory>;
    programs: Array<ICategory>;
    public categoryVideoUser: any;
    public categoryProgramUser: any;

    constructor(
        private formBuilder: FormBuilder,
        private userSerrvice: UsersService,
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.getCategoryDefault();
        this.getProgramDefault();
    }
    createForm() {
        this.permissionUserForm = this.formBuilder.group({
            user: [null, [Validators.required]],
            user_role: [null, [Validators.required]],
        });
    }

    getCategoryDefault() {
        this.categoryService.getAllCategory().then(category => {
            this.categories = category;
        });
    }

    getProgramDefault() {
        this.categoryService.getAllProgram().then(programs => {
            this.programs = programs;
        });
    }

    isInArray(value, array) {
        if (array.length !== 0) {
            return array.indexOf(value) > -1;
        }
        return false;
    }

    onChange(id: string, isChecked: boolean) {
        const idFormArray = <FormArray>this.permissionUserForm.controls.video_permission;

        if (isChecked) {
            idFormArray.push(new FormControl(id));
        } else {
            const index = idFormArray.controls.findIndex(x => x.value === id)
            idFormArray.removeAt(index);
        }
    }

}
