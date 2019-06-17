import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorForumComponent } from './author-forum.component';

describe('AuthorForumComponent', () => {
  let component: AuthorForumComponent;
  let fixture: ComponentFixture<AuthorForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
