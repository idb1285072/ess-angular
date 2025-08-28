import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { NotFound } from './not-found/not-found';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeDetail } from './employee-detail/employee-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'employee-list', component: EmployeeList },
  // { path: 'employee/:id/:name', component: EmployeeDetail },
  { path: 'employee/:id', component: EmployeeDetail },
  { path: '**', component: NotFound }, // must place in last
];
