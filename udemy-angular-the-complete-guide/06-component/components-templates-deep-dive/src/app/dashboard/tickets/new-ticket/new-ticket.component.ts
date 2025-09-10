import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
})
export class NewTicketComponent {
  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  @Output() add = new EventEmitter<{ title: string; data: string }>();
  onSubmit(
    title: HTMLInputElement,
    request: HTMLTextAreaElement,
    form: HTMLFormElement
  ) {
    console.log(title.value, request.value);
    // form.reset();
    this.add.emit({ title: title.value, data: request.value });
    this.form?.nativeElement.reset();
  }
}
