import { Injectable } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private loggingService: LoggingService) {}
  private tasks: Task[] = [];
  get allTasks() {
    return this.tasks;
  }
  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      description: taskData.description,
      id: Math.random().toString(),
      status: 'OPEN',
      title: taskData.title,
    };
    // this.tasks = [...this.tasks, newTask];
    this.tasks.push(newTask);
    this.loggingService.log('ADDED TASK WITH TITLE ' + taskData.title);
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    // this.tasks.map((task) =>
    //   task.id === taskId ? { ...task, status: newStatus } : task
    // );
    const oldTask = this.tasks.find((task) => task.id === taskId);
    if (oldTask) {
      oldTask.status = newStatus;
    }
    this.loggingService.log('CHANGE TASK STATUS TO' + newStatus);
  }
}
