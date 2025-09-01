import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from './new-task.model';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  imports: [FormsModule],
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskData>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDueDate = signal('');

  onCancelAddTask() {
    this.cancel.emit();
  }

  onSubmit() {
    console.log(this.enteredTitle, this.enteredSummary, this.enteredDueDate);
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate,
    });
  }
}
