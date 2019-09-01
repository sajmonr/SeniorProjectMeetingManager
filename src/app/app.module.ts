import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarMenuComponent } from './home/navbar-menu/navbar-menu.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {AuthService} from './shared/auth.service';
import {CalendarService} from './shared/calendar.service';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import {AuthGuard} from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarMenuComponent,
    HomeComponent,
    CalendarComponent,
    AccountComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [AuthService, CalendarService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
