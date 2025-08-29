import { Component, Input, Output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { EventEmitter } from 'stream';
const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input() name!: string;
  @Input() imagePath!: string;
  @Output() select = new EventEmitter();
  sendData(){
    this.select.emit('hi');
  }
  // selectedUser = DUMMY_USERS[randomIndex];
  // get imagePath() {
  //   return 'users/' + this.selectedUser.avatar;
  // }
  // onSelectUser() {
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser = DUMMY_USERS[randomIndex];
  // }
}
