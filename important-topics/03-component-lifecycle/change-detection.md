# Angular Change Detection (CD)

Angular change detection is the **mechanism that keeps the view in sync with your component state**. Anytime your data changes, Angular **checks what changed** and updates the DOM accordingly.

---

## 1️⃣ **How Change Detection Works**

- Angular creates a **component tree**.
- Each component has an associated **view**.
- When a change occurs, Angular walks the **component tree** and **checks bindings**.
- If the **value has changed**, Angular updates the DOM.

**Key principle:** Angular **does not automatically know deep changes** in objects or arrays unless references change (unless you implement `DoCheck`).

---

## 2️⃣ **Change Detection Cycle**

Angular CD is triggered in **two ways**:

1. **Synchronous events**

   - Component events (`click`, `input`)
   - Template-bound events

2. **Asynchronous events**

   - Promises
   - `setTimeout`, `setInterval`
   - Observables (`HttpClient`, `EventEmitter`)

**Cycle steps:**

1. Angular **starts at the root component**.
2. It traverses **each component in the tree**:

   - Checks **all bindings** in the template.
   - Runs **`ngOnChanges()`** if `@Input()` changed.
   - Updates the DOM if necessary.

3. Triggers **`ngDoCheck()`** for custom checks.
4. Runs **`AfterContentChecked`** and **`AfterViewChecked`** hooks.
5. Completes the cycle.

💡 This is why a single event (e.g., `click`) can trigger **CD for multiple components**.

---

## 3️⃣ **Default vs OnPush Strategy**

Angular has **two change detection strategies**:

### **a) Default (CheckAlways)**

- Every change detection cycle checks **all components** in the tree.
- Pros: simple, automatic.
- Cons: can be **expensive** for large apps.

### **b) OnPush**

- Angular **checks the component only if**:

  1. An **@Input() reference changes**.
  2. Component fires an **event** (`EventEmitter`).
  3. An **observable emits a new value**.

- Pros: **Performance boost** in big apps.
- Cons: You must manage **immutable data** or manual CD triggers.

```ts
@Component({
  selector: "app-child",
  template: `{{ data.name }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {}
```

---

## 4️⃣ **Zones and CD**

Angular uses **Zone.js** to **patch async APIs** (`setTimeout`, Promises, DOM events).

- When an async event occurs, **Zone.js notifies Angular**, which triggers a CD cycle automatically.
- That’s why you don’t need to manually call CD in most cases.

---

## 5️⃣ **Manual Change Detection**

Sometimes you want **manual control**:

### Inject **ChangeDetectorRef**

- `markForCheck()` → marks component for checking in next CD cycle.
- `detectChanges()` → triggers CD **immediately** for the component and its children.
- `detach()` → stop CD for this component.
- `reattach()` → resume CD.

```ts
constructor(private cd: ChangeDetectorRef) {}

updateData() {
  this.data = { name: 'Angular' };
  this.cd.detectChanges(); // immediately update view
}
```

---

## 6️⃣ **Performance Tips**

- Prefer **OnPush** for child components with immutable inputs.
- Avoid **heavy logic in template bindings** (called every CD).
- Avoid **frequent `ngDoCheck()`** computations.
- Use `trackBy` in `*ngFor` to avoid unnecessary DOM updates.

---

## 7️⃣ **Angular CD in 1 Picture**

```
Event / Async -> Zone.js -> Triggers CD -> Component Tree Walk ->
    ngOnChanges -> ngDoCheck -> Update DOM -> AfterContentChecked -> AfterViewChecked
```

---

## 8️⃣ **Key Takeaways**

- Angular CD is **automatic but can be controlled**.
- **Default**: check all components. **OnPush**: check only when necessary.
- Works on **reference changes**, not deep mutations.
- **Hooks** tie closely with CD (`ngOnChanges`, `ngDoCheck`, `AfterContentChecked`, `AfterViewChecked`).
