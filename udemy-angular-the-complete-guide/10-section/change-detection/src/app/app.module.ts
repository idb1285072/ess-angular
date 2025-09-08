import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { InfoMessageComponent } from './info-message/info-message.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { NewMessagesComponent } from './messages/new-messages/new-messages.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    InfoMessageComponent,
    MessagesComponent,
    MessagesListComponent,
    NewMessagesComponent,
  ],
  imports: [BrowserModule, FormsModule, AsyncPipe],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
