import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';




class MockAuthService extends AuthService {
  authenticated = true;

  loggedIn() {
    return this.authenticated;
  }

}

describe('Component: Home', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let service;

  beforeEach(() => {


    TestBed.configureTestingModule({
        declarations: [HomeComponent],
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

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MockAuthService)

    });

  afterEach(() => {
    service = null;
    component = null;
  });

  it('should create home component', () => {
    expect(component).toBeTruthy();
  });

  it('Should block guarded items when logged out', () => {
    console.log(service.authenticated);

    spyOn(component, 'ngOnInit').and.returnValue('Test Name');

    expect(component.ngOnInit()).toMatch('Test Name');

    fixture.detectChanges();

    const guardedElemsLength = fixture.debugElement.queryAll(By.css('.btn')).length;
    expect(guardedElemsLength).toEqual(2);

  });

});

