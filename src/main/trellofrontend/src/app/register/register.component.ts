import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {User} from "../model/user";
import {RegisterService} from "../service/register.service";

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  emailValid = false;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }
  regForm = this.formBuilder.group({
    username: [''],
    firstName: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: [''],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  }, {validator : [this.passwordValidator, this.emailValidator]});

  ngOnInit() {
  }
  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  passwordValidator(form: FormGroup) {
    const condition = form.get('password').value !== form.get('confirmPassword').value;
    return condition ? { passwordsDoNotMatch: true} : null;
  }

  onSubmit() {
    this.regForm.patchValue({
      username: this.generateUsername()
    });
    this.user = this.regForm.value;
    console.log(this.user);
    this.registerService.register(this.user).subscribe(data  => {
        console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error", error);
        if(error.error === 'emailexists'){
          this.emailValid = false;
        }
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
