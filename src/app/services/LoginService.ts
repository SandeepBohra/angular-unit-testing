import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from 'src/config/config';
import { Router } from '@angular/router';

export interface UserLoginBody {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = appConfig.API_ENDPOINT;
  isLogin = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  isLoggedIn() {
    return this.isLogin;
  }

  login(userloginBody: UserLoginBody): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}api/login`, userloginBody)
        .toPromise()
        .then((res: BaseResponse) => {
          localStorage.setItem('token', res.token)
          resolve();
        }).catch((err) => {
          reject(err.error);
        });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogin = false;

    this.router.navigateByUrl('/login');
  }
}

export interface BaseResponse {
  token: string;
}