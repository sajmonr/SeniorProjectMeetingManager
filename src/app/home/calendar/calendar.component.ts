import {Component, OnInit, ViewChild} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarComponent} from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendar: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents = [];

  constructor() { }

  ngOnInit() {
    this.calendarEvents.push({
      id: 'a',
      title: 'Test event',
      start: '2019-08-26T07:30:00-04:00',
      end: '2019-08-26T07:30:00-04:00'
    })
  }

  onSelect(eventData){
    console.log(eventData);
  }

}
