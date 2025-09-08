import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskItemComponent } from './tasks/tasks-list/task-item/task-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TasksService } from './tasks/tasks.service';


@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    NewTaskComponent,
    TasksComponent,
    TaskItemComponent,
  ],
  imports: [BrowserModule, FormsModule],
  // providers: [TasksService],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
