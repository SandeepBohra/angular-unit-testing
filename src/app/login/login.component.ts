import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  loginForm: FormGroup;
  authError = false;
  authErrorMsg: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(loginData: { email: any; password: any; }) {
    this.submitted = true;
    this.authError = false;
    this.authErrorMsg = "";
    if (this.loginForm.invalid) {
      return;
    }
    const userloginBody = {
      email: loginData.email,
      password: loginData.password
    };
    // Pending API call and logic handling
    this.loading = true;
    this.loginService.login(userloginBody)
      .then(() => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch((err) => {
        // Failed login
        this.authError = true;
        this.authErrorMsg = err.error;
        this.loading = false;
      });
  }

}