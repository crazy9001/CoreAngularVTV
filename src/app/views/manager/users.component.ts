import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UsersPaginate} from '../../model/users-paginate.model';
import {UsersService} from '../../services/users.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, AfterViewInit {

	users: UsersPaginate;

	constructor(
		private usersService: UsersService,
		public ngxSmartModalService: NgxSmartModalService
	) {
	}

	ngOnInit() {
		this.getAllUsers();
	}
	ngAfterViewInit() {
		const pen: Object = {
			prop1: 'test',
			prop2: true,
			prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
			prop4: 327652175423
		  };
		  this.ngxSmartModalService.setModalData(pen, 'popupUserDetail');
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
}
