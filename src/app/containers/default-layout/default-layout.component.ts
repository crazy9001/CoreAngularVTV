import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../../_nav';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {CONST} from './../../services/app-const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  template: string = '<div class="CMSLoading"></div>';
  constructor(private authService: AuthService, private routeService: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  ngOnInit(){
    localStorage.setItem(CONST.STORE_LAST_ACTION, Date.now().toString());
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
	onLogout(event) {
	event.preventDefault();
	this.authService.logout();
	this.routeService.navigate(['login']);
	}
}
