import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {User} from "../model/user";
import {RegisterService} from "../service/register.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {debounceTime, map} from "rxjs/operators";
import {UserValidators} from "../user.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  emailValid = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private service:UserValidators) { }



  regForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email],this.service.emailValidator()],
    username: ['', Validators.required, this.service.usernameValidator()],
    firstName: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: [''],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  }, {validator : [UserValidators.MatchPassword]});

  ngOnInit() {
  }
  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }


  onSubmit() {
    this.user = this.regForm.value;
    this.user.username = this.user.username.toLowerCase();
    this.user.email = this.user.email.toLowerCase();
    console.log(this.user);
    this.registerService.register(this.user).subscribe(data  => {
        console.log("POST Request is successful ", data);
        this.submitted = true;
      },
      error  => {
        console.log("Error", error);
      })

  }

  generateUsername() {
    const possible = '1234567890';
    const textCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let text = '';
    for (let i = 0; i < 8; i++) {
      if ( i === 0) {
        text += textCharacters.charAt(Math.floor(Math.random() * textCharacters.length));
      } else {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    }
    return text;
  }

}
