import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  loginForm: FormGroup;
  isError = false;
  errorMessage: string;

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
    this.isError = false;
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      return;
    }
    const userloginBody = {
      email: loginData.email,
      password: loginData.password
    };
    this.loading = true;
    this.loginService.login(userloginBody)
      .then(() => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
      })
      .catch((err) => {
        this.isError = true;
        this.errorMessage = err.error;
        this.loading = false;
      });
  }

}