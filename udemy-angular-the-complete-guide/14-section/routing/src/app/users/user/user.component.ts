import { Component, Input } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user!: User;
  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }
}
