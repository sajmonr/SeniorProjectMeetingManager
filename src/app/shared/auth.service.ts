import { Injectable } from '@angular/core';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isInitialized = false;

  constructor(){
    this.initClient();
  }

  login(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      gapi.auth2.getAuthInstance().signIn().then(() => {
        resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  }

  logout(): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      gapi.auth2.getAuthInstance().signOut().then(() => {
        resolve(!gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  }

  isAuthenticated(): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      if(!this.isInitialized)
        this.initClient(() => resolve(gapi.auth2.getAuthInstance().isSignedIn.get()));
      else
        resolve(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  getUserName(): string{
    return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
  }

  private initClient(afterInit?: () => void) {
    if(!this.isInitialized) {
      gapi.load('client', () => {
        gapi.client.init({
          clientId: '148928877653-8tbj6fvn0tpnl3834ds8g82q925f54dn.apps.googleusercontent.com',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar'
        }).then(() => {
          this.isInitialized = true;
          if(afterInit)
            afterInit();
          this.loadScopes();
        });
      });
    }else{
      if(afterInit)
        afterInit();
    }
  }

  private loadScopes(){
    gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
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
