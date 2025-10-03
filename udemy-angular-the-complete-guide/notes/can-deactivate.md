### Step 1: Define a reusable interface

Each component that wants this guard just needs to implement `canExit()`:

```ts
// can-deactivate.interface.ts
export interface CanComponentDeactivate {
  canExit: () => boolean | Promise<boolean> | Observable<boolean>;
}
```

---

### Step 2: Create the generic guard

```ts
// generic-can-deactivate.guard.ts
import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { CanComponentDeactivate } from "./can-deactivate.interface";

@Injectable({ providedIn: "root" })
export class GenericCanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> | Promise<boolean> {
    return component.canExit ? component.canExit() : true;
  }
}
```

---

### Step 3: Use it in components

#### Example: Form Component

```ts
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CanComponentDeactivate } from "./can-deactivate.interface";

@Component({
  selector: "app-my-form",
  template: `<form [formGroup]="form">...</form>`,
})
export class MyFormComponent implements CanComponentDeactivate {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ name: [""] });
  }

  canExit(): boolean {
    return this.form.pristine || confirm("Unsaved changes. Leave anyway?");
  }
}
```

#### Example: Upload Component

```ts
import { Component } from "@angular/core";
import { CanComponentDeactivate } from "./can-deactivate.interface";

@Component({
  selector: "app-upload",
  template: `<p *ngIf="isUploading">Uploading...</p>`,
})
export class UploadComponent implements CanComponentDeactivate {
  isUploading = true;

  canExit(): boolean {
    return !this.isUploading || confirm("Upload in progress. Leave anyway?");
  }
}
```

---

### Step 4: Register guard in routing

```ts
{
  path: 'form',
  component: MyFormComponent,
  canDeactivate: [GenericCanDeactivateGuard]
},
{
  path: 'upload',
  component: UploadComponent,
  canDeactivate: [GenericCanDeactivateGuard]
}
```
