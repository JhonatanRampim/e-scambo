import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userSubject: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<any>((localStorage.getItem('token')) ? jwt_decode(localStorage.getItem('token')) : null);
    this.user = this.userSubject.asObservable();
  }
  public get userValue() {
    return this.userSubject.value;
  }
  login(data?) {
    return this.httpClient.post<any>(environment.apiUrl + '/login', { email: data.login, password: data.pass })
      .pipe(map(user => {
        if (!user.success) {
          return user;
        }
        localStorage.setItem('token', user.data);
        this.userSubject.next(jwt_decode(localStorage.getItem('token')));
        return user;
      }));
  }
  signup(data?) {
    return this.httpClient.post<any>(environment.apiUrl + '/signup',
      { name: data.nome, email: data.email, password: data.password, phone: data.phone })
      .pipe(map(signedUp => signedUp));
  }
  logout() {
    return this.httpClient.get<any>(environment.apiUrl + '/logout')
      .pipe(map(user => {
        localStorage.removeItem('token');
        this.userSubject.next(false);
        return true;
      }));
  }
  check() {
    return this.httpClient.get<any>(environment.apiUrl + '/check')
      .pipe(map(checkedUser => checkedUser));
  }
}
