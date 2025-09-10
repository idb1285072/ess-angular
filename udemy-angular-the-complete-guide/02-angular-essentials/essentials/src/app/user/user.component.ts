import { Component, computed, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';
const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports:[CardComponent]
})
export class UserComponent {
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) name!: string;
  // @Input({ required: true }) avatar!: string;
  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `users/${this.user.avatar}`;
  }
  onSelectUser(){
    this.select.emit(this.user.id);
  }



  // signal
  // user = input.required<User>();
  // select = output<string>();
  // get imagePath() {
  //   return `users/${this.user().avatar}`;
  // }
  // onSelectUser(){
  //   this.select.emit(this.user().id);
  // }

  // STEP 1
  // selectedUser = DUMMY_USERS[randomIndex];
  // get imagePath() {
  //   return `users/${this.selectedUser.avatar}`;
  // }
  // onChangeUser() {
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser = DUMMY_USERS[randomIndex];
  // }

  // signal
  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(()=> `users/${this.selectedUser().avatar}`);
  // onChangeUser(){
  //   return this.selectedUser.set(DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]);
  // }
}
