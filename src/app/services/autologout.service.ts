import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth-service.service';

const MINUTES_UNITL_AUTO_LOGOUT = 1;
const CHECK_INTERVAL = 15000;
const STORE_KEY = 'lastAction';

@Injectable({
	providedIn: 'root'
})

export class AutoLogoutService {

	constructor(
		private router: Router,
		private authService: AuthService,
	) {
		console.log('object created');
		// this.auth = authService;
		this.check();
		this.initListener();
		this.initInterval();
	}

	public getLastAction() {
		return parseInt(localStorage.getItem(STORE_KEY));
	}

	public setLastAction(lastAction: number) {
		localStorage.setItem(STORE_KEY, lastAction.toString());
	}

	check() {
		const now = Date.now();
		const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 5 * 1000;
		const diff = timeleft - now;
		const isTimeout = diff < 0;


		// if (isTimeout && this.auth.loggedIn)
		if (isTimeout) {
			// alert('logout');
			this.authService.logout();
			window.location.href = './login';
			//this.router.navigate(['./login']);
		}
	}

	initListener() {
		document.body.addEventListener('click', () => this.reset());
		document.body.addEventListener('mouseover', () => this.reset());
		document.body.addEventListener('mouseout', () => this.reset());
		document.body.addEventListener('keydown', () => this.reset());
		document.body.addEventListener('keyup', () => this.reset());
		document.body.addEventListener('keypress', () => this.reset());
	}

	reset() {
		this.setLastAction(Date.now());
	}

	initInterval() {
		setInterval(() => {
			this.check();
		}, CHECK_INTERVAL);
	}

}
