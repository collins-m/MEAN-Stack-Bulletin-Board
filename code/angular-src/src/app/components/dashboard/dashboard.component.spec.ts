import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from '../forum/forum.component';
import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule.withRoutes([]),],
      declarations: [ DashboardComponent, ForumComponent ],
      providers: [ NgFlashMessageService, HttpClient, HttpHandler ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
