import {CalendarEvent} from '../models/calendar-event.model';

declare var gapi: any;

export class CalendarService{

  async getCalendarEvents(): Promise<CalendarEvent[]>{
    const rawEvents = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events: CalendarEvent[] = [];

    rawEvents.result.items.forEach(event => {
      let e = new CalendarEvent();

      e.title = event.description;
      e.startTime = event.start.dateTime;
      e.endTime = event.end.dateTime;

      events.push(e);
    });

    return events;
  }

}
