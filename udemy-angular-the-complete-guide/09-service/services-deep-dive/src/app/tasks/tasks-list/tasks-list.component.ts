import { Component, inject } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  constructor(private tasksService: TasksService) {}
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  selectedFilter: string = 'all';
  // tasks = this.tasksService.allTasks;
  get tasks() {
    switch (this.selectedFilter) {
      case 'all':
        return this.tasksService.allTasks;
      case 'open':
        return this.tasksService.allTasks.filter(
          (task) => task.status === 'OPEN'
        );
      case 'in-progress':
        return this.tasksService.allTasks.filter(
          (task) => task.status === 'IN_PROGRESS'
        );
      case 'done':
        return this.tasksService.allTasks.filter(
          (task) => task.status === 'DONE'
        );
      default:
        return this.tasksService.allTasks;
    }
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter = filter;
  }
}
