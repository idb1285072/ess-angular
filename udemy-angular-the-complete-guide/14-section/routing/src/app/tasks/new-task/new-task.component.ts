import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, CanDeactivateFn, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  // @Input() userId!: string;
  userId = '';
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';
  constructor(
    private tasksService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userId = paramMap.get('userId') || '';
      },
    });
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    console.log(this.tasksService.allTasks);
    this.router.navigate(['/user', this.userId, 'tasks'], {
      replaceUrl: true, // back not working
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (
    component.enteredTitle ||
    component.enteredDate ||
    component.enteredSummary
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose the entered data.'
    );
  }
  return true;
};
