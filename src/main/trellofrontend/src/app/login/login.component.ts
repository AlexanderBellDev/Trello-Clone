import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../service/register.service";
import {LoginService} from "../service/login.service";
import {User} from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  usererror = false;
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private route:Router, private registerService: RegisterService,
              private loginService: LoginService) { }
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  ngOnInit(
  ) {
    if(this.registerService.username){
      this.loginForm.patchValue({
        username: this.registerService.username
      });
    }
  }


  onSubmit() {
    this.user = this.loginForm.value;
    console.log(this.loginForm);
    this.loginService.checkUser(this.user).subscribe(data  => {
        console.log("POST Request is successful ", data);
        sessionStorage.setItem('authenticatedUser', this.user.username);
        this.route.navigate(['userhome']);
      },
      error  => {
        console.log("Error", error);
        this.usererror = true;
      })
  }
}
