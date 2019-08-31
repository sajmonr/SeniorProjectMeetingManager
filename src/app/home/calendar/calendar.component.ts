import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {AuthService} from '../../shared/auth.service';
import {CalendarService} from '../../shared/calendar.service';
import {CalendarEvent} from '../../models/calendar-event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent{
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents = [];

  constructor(private auth: AuthService, private calendar: CalendarService) { }

  onSelect(eventData){
    console.log(eventData);
  }

  onLogin(){
    this.auth.login();
  }

  onGetCalendar(){
    this.calendar.getCalendarEvents().then(events => { this.setEvents(events); });
  }

  onLogout(){
    this.auth.logout();
  }

  private addEvent(event: CalendarEvent){
    const newEvents = this.calendarEvents.slice();

    newEvents.push(this.createFullCalendarEvent(event));

    this.calendarEvents = newEvents;
  }

  private addEvents(events: CalendarEvent[]){
    const newEvents = this.calendarEvents.slice();
    events.forEach(event => {
      newEvents.push(this.createFullCalendarEvent(event));
    });
    this.calendarEvents = newEvents;
  }

  private setEvents(events: CalendarEvent[]){
    const newEvents = [];

    events.forEach(event => {
      newEvents.push(this.createFullCalendarEvent(event));
    });

    this.calendarEvents = newEvents;
  }

  private createFullCalendarEvent(event: CalendarEvent){
    return {
      title: event.title,
      start: event.startTime,
      end: event.endTime
    }
  }

}
