import {Component, OnInit} from '@angular/core';
import {UsersPaginate} from '../../model/users-paginate.model';
import {UsersService} from '../../services/users.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Users } from '../../model/users.model';
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

	users: UsersPaginate;
	constructor(
		private usersService: UsersService,
		public ngxSmartModalService: NgxSmartModalService
	) {
	}

	ngOnInit() {
		this.getAllUsers();
	}
	
	getAllUsers() {
		this.usersService.getAllUsers().then(users => {
			this.users = users;
		});
	}

	prevPage() {
		this.usersService.getUsersAtUrl(this.users.prev_page_url).then(users => this.users = users);
	}

	nextPage() {
		this.usersService.getUsersAtUrl(this.users.next_page_url).then(users => this.users = users);
	}

	selectUser(user: Users) {
		this.ngxSmartModalService.resetModalData('popupUserDetail');
		this.ngxSmartModalService.setModalData(user, 'popupUserDetail');
	}
}
