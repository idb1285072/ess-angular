import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task/task.model';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  // userTasks: Task[] = [];
  // @Input() order?: 'asc' | 'desc';
  order?: 'asc' | 'desc';
  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksServie: TasksService
  ) {}

  userId: string = '';
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userId = paramMap.get('userId') || '';
      },
    });

    // this.activatedRoute.queryParamMap.subscribe({
    //   next: (queryParamMap) => {
    //     const orderParam = queryParamMap.get('order') || 'asc';
    //     if (orderParam === 'asc' || orderParam === 'desc') {
    //       this.order = orderParam;
    //     }
    //   },
    // });

    this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order = params['order']),
    });
  }

  get userTasks() {
    return this.tasksServie.allTasks
      .filter((task) => task.userId === this.userId)
      .sort((a, b) => {
        if (this.order === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      });
  }
}
