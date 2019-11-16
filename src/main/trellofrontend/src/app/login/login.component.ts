import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../service/register.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string;
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private route:Router, private registerService: RegisterService) { }
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
    console.log(this.loginForm);
  }
}
