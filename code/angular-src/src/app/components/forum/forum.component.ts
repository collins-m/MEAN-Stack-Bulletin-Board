import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [AuthService]
})

export class ForumComponent implements OnInit {

  public posts: any [];
  forum: any;
  id: Object;

  constructor(
    private authService: AuthService,
    private ngFlashMessagesService: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost(){
    this.authService.getAllPost().subscribe(res => {
      this.posts = res['data'];
    });
  }

  onDelete(post){
    this.id = {
      id: post._id
    }
    this.authService.deletePost(this.id).subscribe(res => {
      if(res.success){
        this.ngFlashMessagesService.showFlashMessage({
          messages: [res.msg],
          dismissible: true,
          timeout: 5000,
          type: 'success'
        });
      } else {
        this.ngFlashMessagesService.showFlashMessage({
          messages: ['Forum Post was not removed'],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });
      }
    });
  }
}
