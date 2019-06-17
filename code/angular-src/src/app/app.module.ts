import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { NgArrayPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService} from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ClubsComponent } from './components/clubs/clubs.component';
import { ClubComponent } from './components/clubs/club/club.component';
import { RecentPostsComponent } from './components/profile/recent-posts/recent-posts.component';
import { ClubMembershipsComponent } from './components/profile/club-memberships/club-memberships.component';
import { ForumComponent } from './components/forum/forum.component';
import { AuthorForumComponent } from './components/author-forum/author-forum.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'clubs', component: ClubsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ClubsComponent,
    ClubComponent,
    RecentPostsComponent,
    ClubMembershipsComponent,
    ForumComponent,
    AuthorForumComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgArrayPipesModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    HttpClient,
    ValidateService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
