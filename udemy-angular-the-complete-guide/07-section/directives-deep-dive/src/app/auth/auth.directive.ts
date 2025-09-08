import {
  Directive,
  DoCheck,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';
@Directive({
  selector: '[appAuth]',
  standalone: false,
})
export class AuthDirective implements DoCheck {
  ngDoCheck(): void {
    this.updateView();
  }

  @Input('appAuth') userType!: Permission;
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);


  private updateView() {
    if (this.authService.activePermission === this.userType) {
      console.log('Show');
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      console.log('not show');
      this.viewContainerRef.clear();
    }
  }
}
