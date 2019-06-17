import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngFlashMessagesService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    },
    err => {
      return false;
    }
    );
  }

  onLogoutClick(){
    this.authService.logout();
    this.ngFlashMessagesService.showFlashMessage({
      messages: ['You are now logged out'],
      dismissible: true,
      timeout: 4000
    });
    this.router.navigate(['/']);
    return false;
  }

}
