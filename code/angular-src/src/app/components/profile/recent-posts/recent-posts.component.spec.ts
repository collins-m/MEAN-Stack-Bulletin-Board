import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { RecentPostsComponent } from './recent-posts.component';

class MockAuthService extends AuthService {
  authenticated = true;

  loggedIn() {
    return this.authenticated;
  }

}


describe('Component: Navbar', () => {

  let fixture: ComponentFixture<RecentPostsComponent>;
  let component: RecentPostsComponent;
  let service;

  beforeEach(() => {


    TestBed.configureTestingModule({
        declarations: [RecentPostsComponent],
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

    fixture = TestBed.createComponent(RecentPostsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MockAuthService);

    });

  afterEach(() => {
    service = null;
    component = null;
  });


  it('should create recent posts component', () => {
    expect(RecentPostsComponent).toBeTruthy();
  });




});

