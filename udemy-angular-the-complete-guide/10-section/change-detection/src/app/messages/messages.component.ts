import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  messages: string[] = [];
  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  onAddMessage(message: string) {
    // this.messages.update((oldMessages) => [...oldMessages, message]);
    this.messages = [...this.messages, message];
  }
}
