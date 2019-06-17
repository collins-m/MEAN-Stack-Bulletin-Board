import { NavbarComponent } from './navbar.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthorForumComponent } from '../author-forum/author-forum.component';




class MockAuthService extends AuthService {
  authenticated = true;

  loggedIn() {
    return this.authenticated;
  }

}

describe('Component: Navbar', () => {

  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let service;

  beforeEach(() => {


    TestBed.configureTestingModule({
        declarations: [NavbarComponent, AuthorForumComponent],
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

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MockAuthService);

    });

  afterEach(() => {
    service = null;
    component = null;
  });


  it('should create home component', () => {
    expect(NavbarComponent).toBeTruthy();
  });


  it('Should block nav items when logged out', () => {
    console.log(service.authenticated);

    spyOn(component, 'ngOnInit').and.returnValue('Test Name');

    service.authenticated = false;
    expect(component.ngOnInit()).toMatch('Test Name');

    fixture.detectChanges();

    const guardedElemsLength = fixture.debugElement.queryAll(By.css('.nav-link')).forEach(x => {

      x = x.nativeElement;
      console.log(x);
    });

    console.log(service.authenticated);

  });


});

