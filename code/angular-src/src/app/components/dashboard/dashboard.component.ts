import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: String;
  body: String;
  author: String;

  constructor(
    private ngFlashMessagesService: NgFlashMessageService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.author = profile.user.username;
    },
    err => {
      return false;
    }
    );
  }

  onForumSubmit() {
    const forum = {
      title: this.title,
      body: this.body,
      author: this.author
    }

    // Create Post
    this.authService.createPost(forum).subscribe(data => {
      if(data.success){
        this.ngFlashMessagesService.showFlashMessage({
          messages: ['Post created'],
          dismissible: true,
          timeout: 3000,
          type: 'success'
        });
      } else {
        this.ngFlashMessagesService.showFlashMessage({
          messages: ['Post not created'],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });
      }
    });
  }

}
