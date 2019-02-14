import { Component, OnInit } from '@angular/core';
import { AutoLogoutService } from './../../services/autologout.service';
@Component({
  selector: 'app-auto-logout',
  templateUrl: './auto-logout.component.html',
  providers: [AutoLogoutService]
})
export class AutoLogoutComponent implements OnInit {

  constructor(private AutoLogoutService: AutoLogoutService) { }

  ngOnInit() {
  }

}
