import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-messages',
  templateUrl: './new-messages.component.html',
  styleUrls: ['./new-messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMessagesComponent {
  private messagesService = inject(MessagesService);
  @Output() add = new EventEmitter();
  enteredText = '';
  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    // this.add.emit(this.enteredText);
    this.messagesService.addMessage(this.enteredText);
    this.enteredText = '';
  }
}
