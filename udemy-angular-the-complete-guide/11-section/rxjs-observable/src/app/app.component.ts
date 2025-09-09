import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
     
      console.log('Emitting new value...');
      subscriber.next({ message: 'New value' });
      timesExecuted++;
    }, 1000);
  });

  ngOnInit(): void {
    // this.subscription = interval(1000)
    //   .pipe(map((value) => value * 2))
    //   .subscribe({
    //     next: (value) => console.log(value),
    //     complete: () => console.log('complete'),
    //     error: (error) => console.error(error),
    //   });
    this.subscription = this.customInterval$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Completed'),
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  onClick() {}
}
