import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsComponent } from './clubs.component';
import { ClubComponent } from './club/club.component';
import { By } from '@angular/platform-browser';

describe('ClubsComponent', () => {
  let fixture: ComponentFixture<ClubsComponent>;
  let component: ClubsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClubsComponent,
        ClubComponent
      ]
    });

    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('is rendering club previews', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.queryAll(By.css('app-club')).length;
    expect(compiled).toEqual(7);

});

});
