import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.initClient();
  }

  login() {
    gapi.auth2.getAuthInstance().signIn();
  }

  logout(){
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log('signed out');
    });
  }

  isSignedIn(): boolean{
    return gapi.auth2.getAuthInstance().isSignedIn();
  }

  private initClient() {
    gapi.load('client', () => {
      gapi.client.init({
        clientId: '148928877653-8tbj6fvn0tpnl3834ds8g82q925f54dn.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })
      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    });
  }

  async getCalendarList(){
    const calendars = await gapi.client.calendar.calendarList.list();
    console.log(calendars);
  }

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'America/Los_Angeles'
      },
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it'
    })

    //await this.getCalendar();
  }


}

const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60 ).toISOString();
