import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: String;
  name: String;
  email: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngFlashMessagesService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.name = profile.user.name;
      this.email = profile.user.email;
    },
    err => {
      return false;
    }
    );
  }

  onDeleteSubmit(){
    const realUser = JSON.parse(localStorage.getItem('user'));
    const user = {
      username: this.username
    }
    if(realUser.username === user.username){
      this.router.navigate(['/']);
      this.authService.logout();
      this.authService.deleteUser(user).subscribe(data => {
        if(data.success){
          this.ngFlashMessagesService.showFlashMessage({
            messages: [data.msg],
            dismissible: true,
            timeout: 5000,
            type: 'success'
          });
        }
      });
    } else {
      this.ngFlashMessagesService.showFlashMessage({
        messages: ['Username was not inputted correctly'],
        dismissible: true,
        timeout: 3000,
        type: 'danger'
      });
    }
  }

}
