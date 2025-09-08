import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  @ViewChild('form') formElement =
    inject<ElementRef<HTMLFormElement>>(ElementRef);
  onAddTask(title: string, description: string) {
    this.tasksService.addTask({title:title, description:description})
    this.formElement?.nativeElement.reset();
  }

  constructor(private tasksService: TasksService) {}
}
