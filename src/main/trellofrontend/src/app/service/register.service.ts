import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";

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
    return this.http.post<User>(`http://localhost:8080/api/register`,user)
  }

}
