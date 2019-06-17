import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;
  forum: any;
  username: any;

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .pipe(map((response: any) => response));
  }

  deleteUser(user){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/delete', user, {headers: headers})
      .pipe(map((response: any) => response));
  }

  authenticateUser(user){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .pipe(map((response: any) => response));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  createPost(forum){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/forums/create', forum, {headers: headers})
      .pipe(map((response: any) => response));
  }

  isAuthor(author){
    this.loadUsername();
    return this.username === author;
  }

  deletePost(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/forums/delete', id, {headers: headers})
      .pipe(map((response: any) => response));
  }

  getAllPost(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:3000/forums/forumList', {headers: headers})
      .pipe(map((response: any) => response));
  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .pipe(map((response: any) => response));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUsername(){
    const username = JSON.parse(localStorage.getItem('user')).username;
    this.username = username;
  }

  loggedIn(){
    const jwtHelper = new JwtHelperService();
    this.loadToken();
    if(!this.authToken){
      return false;
    }
    return !jwtHelper.isTokenExpired(this.authToken);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
