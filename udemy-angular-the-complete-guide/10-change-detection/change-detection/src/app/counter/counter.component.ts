import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  zone = inject(NgZone);
  ngOnInit() {
    setTimeout(() => {
      this.count = 0;
    }, 4000);

    // off zone.js
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('Timer expired!');
      }, 5000);
    });
  }
  count = 0;

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count = this.count - 1;
  }

  onIncrement() {
    this.count = this.count + 1;
  }
}
