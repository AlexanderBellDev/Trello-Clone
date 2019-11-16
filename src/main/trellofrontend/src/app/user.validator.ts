import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';

const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {
  constructor(private http: HttpClient) {}


  searchUsername(text) {
   text = text.toLowerCase();
    // debounce
    return timer(200)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(`${URL}/api/checkusername/${text}`)
        })
      );
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUsername(control.value)
        .pipe(
          map(res => {
            // if username is already taken
            if (res.length) {
              // return error
              return { 'usernameExists': true};
            }
          })
        );
    };
  }

  searchUserEmail(text) {
    text = text.toLowerCase();
    // debounce
    return timer(200)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(`${URL}/api/checkemail/${text}`)
        })
      );
  }

  emailValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return this.searchUserEmail(control.value)
          .pipe(
            map(res => {
              // if username is already taken
              if (res.length) {
                // return error
                return { 'emailExists': true};
              }
            })
          );
      };
  }




  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    if(AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
      let verifyPassword = AC.get('confirmPassword').value;

      if(password != verifyPassword) {
        AC.get('confirmPassword').setErrors( {MatchPassword: true} )
      } else {
        return null
      }
    }
  }

}
