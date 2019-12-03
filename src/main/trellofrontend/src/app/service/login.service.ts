import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtToken} from "../model/jwt-token";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  checkUser(user){
    return this.http.post<JwtToken>(`${environment.API_URL}/api/auth/signin`,user)
  }

  logout() {
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('authenticatedUser');
  }

  isUserLoggedIn() {
    let authUser = sessionStorage.getItem('authenticatedUser');
    let token = sessionStorage.getItem('TOKEN');
    return !(authUser === null && token === null)
  }


}
