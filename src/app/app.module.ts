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

@NgModule({
  declarations: [
    AppComponent,
    NavbarMenuComponent,
    HomeComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [AuthService, CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
