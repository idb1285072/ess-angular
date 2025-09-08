import { Component, inject } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  // providers:[TasksService]
})
export class TasksListComponent {
  private tasksService = inject(TasksService);
  selectedFilter: string = 'all';
  onChangeTasksFilter(filter: string) {
    this.selectedFilter = filter;
    // this.tasksService.updateTaskStatus()
  }
  // tasks = this.tasksService.allTasks;
  get tasks(){
    switch(this.selectedFilter){
      case 'all':
        return this.tasksService.allTasks;
      case 'open':
        return this.tasksService.allTasks.filter(task=>task.status==='OPEN')
      case 'in-progress':
        return this.tasksService.allTasks.filter(task=>task.status==='IN_PROGRESS')
      case 'done':
        return this.tasksService.allTasks.filter(task=>task.status==='DONE')
      default:
        return this.tasksService.allTasks;
    }
  }
}
