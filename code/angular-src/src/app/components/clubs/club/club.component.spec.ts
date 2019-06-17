import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubComponent } from './club.component';
import { By } from '@angular/platform-browser';

describe('ClubComponent', () => {
  let component: ClubComponent;
  let fixture: ComponentFixture<ClubComponent>;
  let image;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', async(() => {
    fixture.detectChanges();
    image = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(image).toBeTruthy();
  }));
});
