import { inject, NgModule } from '@angular/core';
import { CanMatchFn, Router, RouterModule, Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return router.parseUrl('/unauthorized');
};

const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected',
  },
  // {
  //   path: 'tasks',
  //   component: TasksComponent,
  // },
  {
    path: 'user/:userId',
    component: UserTasksComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'tasks',
    //     pathMatch: 'prefix',
    //   },
    //   {
    //     path: 'tasks',
    //     component: TasksComponent,
    //   },
    //   {
    //     path: 'tasks/new',
    //     component: NewTaskComponent,
    //   },
    // ],
    children: userRoutes,
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    title: resolveTitle,
    canMatch: [dummyCanMatch],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
