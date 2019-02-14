import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal-userinfomation',
  templateUrl: './modal-userinfomation.component.html'
})
export class ModalUserinfomationComponent implements OnInit, AfterViewInit {

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    console.log(this.ngxSmartModalService.getModalData('popupUserDetail'));
  }
}
