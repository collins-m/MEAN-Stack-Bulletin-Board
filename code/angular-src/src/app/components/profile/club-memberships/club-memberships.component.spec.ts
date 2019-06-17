import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMembershipsComponent } from './club-memberships.component';

describe('ClubMembershipsComponent', () => {
  let component: ClubMembershipsComponent;
  let fixture: ComponentFixture<ClubMembershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubMembershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubMembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
