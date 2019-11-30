import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {BoardComponent} from "./board/board.component";
import {LogoutComponent} from "./logout/logout.component";
import {RouteGuardService} from "./service/route-guard.service";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'board', component: BoardComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component:LogoutComponent, canActivate:[RouteGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
