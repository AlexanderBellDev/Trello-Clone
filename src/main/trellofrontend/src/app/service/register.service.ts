import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}


  register(user){
    return this.http.post<User>(`http://localhost:8080/api/register`,user)
  }
}
