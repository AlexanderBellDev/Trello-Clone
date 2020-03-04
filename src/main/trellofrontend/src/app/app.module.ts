import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BoardComponent} from './board/board.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptorService} from "./service/auth-interceptor.service";
import {LogoutComponent} from './logout/logout.component';
import {SettingsDialogComponent} from './settings-dialog/settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    BoardComponent,
    ItemDetailComponent,
    LogoutComponent,
    SettingsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule
  ],
  entryComponents: [
    ItemDetailComponent,
    SettingsDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
