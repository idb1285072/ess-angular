import { Component, Input, Inject } from '@angular/core';
import { Task, TaskStatus } from '../../task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  // private tasksService = Inject(TasksService);
  constructor(private tasksService:TasksService){}
  @Input() task!: Task;
  get taskStatus() {
    switch (this.task.status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  }
  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';
console.log('click',taskId, status)
    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }
    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
