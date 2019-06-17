
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ForumComponent } from './forum.component';
import { AuthorForumComponent } from '../author-forum/author-forum.component';




class MockAuthService extends AuthService {
  authenticated = true;

  loggedIn() {
    return this.authenticated;
  }

}

describe('Component: Forum', () => {

  let fixture: ComponentFixture<ForumComponent>;
  let component: ForumComponent;
  let service;

  beforeEach(() => {


    TestBed.configureTestingModule({
        declarations: [ForumComponent, AuthorForumComponent],
        imports: [
          RouterTestingModule.withRoutes([]),
          HttpClientModule
        ],
        providers: [
          MockAuthService,
          NgFlashMessageService,
          HttpClient, HttpHandler
          ]
      });

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MockAuthService)

    });

  afterEach(() => {
    service = null;
    component = null;
  });

  it('Should call getAllPosts when page starts', () => {
    expect(component.getAllPost).toHaveBeenCalled;
  });

  it('Should render forum component', () => {
    expect(component).toBeTruthy();
  });


});

