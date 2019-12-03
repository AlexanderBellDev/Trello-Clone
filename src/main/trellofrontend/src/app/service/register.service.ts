import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private _username: string;


  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  constructor(private http: HttpClient) {}


  register(user){
    return this.http.post<User>(`${environment.API_URL}/api/auth/register`,user)
  }

}
