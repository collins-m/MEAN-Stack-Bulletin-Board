import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private ngFlashMessagesService: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.ngFlashMessagesService.showFlashMessage({messages: ['please fill in all fields'], dismissible: true, timeout: 3000, type: 'danger'});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.ngFlashMessagesService.showFlashMessage({messages: ['please enter a valid email'], dismissible: true, timeout: 3000, type: 'danger'});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.ngFlashMessagesService.showFlashMessage({
          messages: ['Registration successful'],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });
        this.router.navigate(['/login']);
      } else {
        this.ngFlashMessagesService.showFlashMessage({
          messages: ['Registration unsuccessful'],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
