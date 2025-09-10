import { Injectable } from '@angular/core';
import { DUMMY_USERS } from 'src/app/dummy-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get users() {
    return DUMMY_USERS;
  }
}
