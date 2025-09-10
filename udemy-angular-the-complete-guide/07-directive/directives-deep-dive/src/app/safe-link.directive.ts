import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
@Directive({
  selector: 'a[appSafeLink]',
  standalone: false,
})
export class SafeLinkDirective {
  @Input('appSafeLink') queryParam = 'myapp';
  hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    const isConfirm = window.confirm('Are you sure to follow the link');
    // const path = (event.target as HTMLAnchorElement).href;
    // (event.target as HTMLAnchorElement).href =
    //   path + '?from=' + this.queryParam;
    const path = this.hostElementRef.nativeElement.href;
    this.hostElementRef.nativeElement.href = path + '?from=' + this.queryParam;
    if (isConfirm) {
      return;
    }
    event.preventDefault();
  }
}
