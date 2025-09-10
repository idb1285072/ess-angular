import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
})
export class UserTasksComponent implements OnInit, OnDestroy {
  userName = '';
  subscription?: Subscription;
  submitted=false;
  // @Input() userId!: string;

  // get userName() {
  //   return (
  //     this.usersService.users.find((user) => user.id === this.userId)?.name ||
  //     ''
  //   );
  // }

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    // this.subscription = this.activatedRoute.paramMap.subscribe({
    //   next: (paramMap) =>
    //     (this.userName =
    //       this.usersService.users.find(
    //         (user) => user.id === paramMap.get('userId')
    //       )?.name || ''),
    // });

    // dynamic data - resolve
    this.activatedRoute.data.subscribe(
      (data) => (this.userName = data['userName'])
    );

    // static data - data
    this.activatedRoute.data.subscribe((data) => console.log(data['message']));
  }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
