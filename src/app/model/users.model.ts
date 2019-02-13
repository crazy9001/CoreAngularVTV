import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class Users {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    phone: string;
    username: string;
}
