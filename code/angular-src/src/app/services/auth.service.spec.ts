import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing/';


describe('AuthService', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach( () => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('Should retrieve posts using GET', () => {
    const mock_posts = [
      { title: 't1', author: 'a1', body: 'b1', comments: 'c1'},
      { title: 't2', author: 'a2', body: 'b2', comments: 'c2'}
    ];

    service.getAllPost().subscribe(posts => {
      expect(posts.length).toEqual(2);
    });

    const request = httpMock.expectOne('http://localhost:3000/forums/forumList');
    expect(request.request.method).toBe('GET');
    request.flush(mock_posts);

  });


  it('Should successfully create an account', () => {

    service.registerUser({ name: 't2', email: 'a2', username: 'b2', password: 'c2'}).subscribe(response => {
      expect(response.sucess).toBeTruthy();
    });
    const request = httpMock.expectOne('http://localhost:3000/users/register');
    expect(request.request.method).toBe('POST');
  });


  it('Should successfully authenticate user', () => {

    service.authenticateUser({ name: 't2', email: 'a2', username: 'b2', password: 'c2'}).subscribe(response => {
      expect(response.sucess).toBeFalsy();
    });
    const request = httpMock.expectOne('http://localhost:3000/users/authenticate');
    expect(request.request.method).toBe('POST');
  });


  it('Should unsuccessfully authenticate user', () => {

    service.authenticateUser({ name: 't2', email: 'a2', username: 'b2', password: 'c2'}).subscribe(response => {
      expect(response.sucess).toBeTruthy();
    });
    const request = httpMock.expectOne({ name: 't2', email: 'a2', username: 'b2', password: 'c2'});
    expect(request.request.method).toBe('POST');
  });


  it('Should successfully create post', () => {

    service.createPost({ title: 't1', author: 'a1', body: 'b1', comments: 'c1'})
      .subscribe(response => {
        expect(response.sucess).toBeTruthy();
    });


    const request = httpMock.expectOne('http://localhost:3000/forums/create');
    expect(request.request.method).toBe('POST');


  });


});


