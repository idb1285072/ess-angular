import { Component, signal } from '@angular/core';
import { Header } from './header/header.component';
import { User } from './user/user';
import { DUMMY_USERS } from './dummy-users';
@Component({
  selector: 'app-root',
  imports: [Header, User],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  users = DUMMY_USERS;
  receiveData(m:string){
    console.log(m)
  }
}
