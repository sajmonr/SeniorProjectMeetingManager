import {CalendarEvent} from '../models/calendar-event.model';

declare var gapi: any;

export class CalendarService{
  private readonly calendarName = 'Meeting manager';

  async getCalendarEvents(): Promise<CalendarEvent[]>{
    const calendar = await this.getCalendar();

    if(calendar == null)
      return [];

    const rawEvents = await gapi.client.calendar.events.list({
      calendarId: calendar.id,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events: CalendarEvent[] = [];

    rawEvents.result.items.forEach(event => {
      let e = new CalendarEvent();

      e.title = event.summary;
      e.startTime = event.start.dateTime;
      e.endTime = event.end.dateTime;

      events.push(e);
    });

    return events;
  }

  private async getCalendar(){
    if(!await this.calendarExists())
      await this.createCalendar();

    const calendars = await gapi.client.calendar.calendarList.list();
    for(let c of calendars.result.items){
      if(c.summary === this.calendarName)
        return c;
    }
    return null;
  }

  private async calendarExists(): Promise<boolean> {
    let calendars = await gapi.client.calendar.calendarList.list();

    for(let c of calendars.result.items){
      if(c.summary == this.calendarName)
        return true;
    }

    return false;
  }
  private async createCalendar() {
    await gapi.client.calendar.calendars.insert({summary: this.calendarName});
  }

}
