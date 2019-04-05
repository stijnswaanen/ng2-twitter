# ng2-twitter-httpclient
Angular service of authorized request for twitter.
This is a port of the ng2-twitter package which makes use of the deprecated HttpModule in Angular.
Therefore the original package cannot be used in Angular 4 or higher. 

## Installation
Install through `npm`:

`npm install --save ng2-twitter-httpclient`

## Usage
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TwitterService } from 'ng2-twitter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TwitterService], // Add
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
import { Component } from '@angular/core';
import { TwitterService } from 'ng2-twitter-httpclient';

@Component({
  selector: 'app-root',
  template: `
		<h1>{{title}}</h1>
		<button (click)="getHomeTimeline()">get/home_timeline</button>
		<p>{{result}}</p>
	`
})
export class AppComponent {
  title = 'app works!';
  result = '';
  constructor(private twitter: TwitterService){ }

  getHomeTimeline(){
    this.twitter.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      {
        count: 5
      },
      {
        consumerKey: 'consumerKey',
        consumerSecret: 'consumerSecret'
      },
      {
        token: 'token',
        tokenSecret: 'tokenSecret'
      }
  ).subscribe((res)=>{
      this.result = res.json().map(tweet => tweet.text);
  });
  }
}
```

## Note
In Web browser, JavaScript application cannot access external domain server because of Cross-Origin Resource Sharing.

This service supposes to be used in Cordova, Electron, Chrome Extensions or web security disabled browser.
