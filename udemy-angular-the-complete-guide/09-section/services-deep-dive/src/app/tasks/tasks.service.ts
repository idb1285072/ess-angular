import { Injectable } from '@angular/core';
import { Task, TaskStatus } from './task.model';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [];
  readonly allTasks = this.tasks;
  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.push(newTask);
  }
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    // console.log('service');
    // this.tasks = this.tasks.map((task) =>
    //   task.id === taskId ? { ...task, status: newStatus } : task
    // );
    const newTask = this.tasks.find(task=>task.id===taskId);
    if(newTask){
      newTask.status=newStatus;
    }
  }
}
