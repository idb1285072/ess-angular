# Component Lifecycle Hook

Every Angular component (and directive) goes through a **lifecycle** from **creation → rendering → data changes → destruction**.
Angular provides **lifecycle hooks (methods)** that let you run custom logic at specific moments.

---

## 1. **`ngOnChanges(changes: SimpleChanges)`**

- **When**: Called **right after `@Input()` properties change** (before `ngOnInit`). Runs multiple times whenever parent changes input values.
- **Purpose**: React to input changes.
- **Parameters**: `changes` object → tells old & new values.
- **Use case**: If you need to execute logic when parent passes new data.

```ts
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    console.log('User ID changed:', changes['userId'].currentValue);
  }
}
```

---

## 2. **`ngOnInit()`**

- **When**: Called **once** after the first `ngOnChanges`. Runs after component’s data-bound properties are initialized.
- **Purpose**: Initialize component state, fetch data.
- **Use case**: Place initial API calls, setup form, or local variables.

```ts
ngOnInit() {
  console.log('Component initialized');
  this.loadUsers();
}
```

---

## 3. **`ngDoCheck()`**

- **When**: Runs **during every change detection cycle** (after `ngOnChanges` & `ngOnInit`).
- **Purpose**: Detect and act on changes Angular can’t track automatically (deep object mutations).
- **Use case**: Custom change detection logic.

```ts
ngDoCheck() {
  console.log('Change detection running');
}
```

⚠️ Runs very frequently → be careful with performance.

---

## 4. **`ngAfterContentInit()`**

- **When**: Called **once** after Angular projects external content (`ng-content`) into the component.
- **Purpose**: Initialize logic that depends on projected content.
- **Use case**: When using `<ng-content>` or content projection.

```ts
ngAfterContentInit() {
  console.log('Projected content initialized');
}
```

---

## 5. **`ngAfterContentChecked()`**

- **When**: Runs **after every change detection** on projected content.
- **Purpose**: Respond after Angular checks projected content.
- **Use case**: Track projected content updates.

```ts
ngAfterContentChecked() {
  console.log('Projected content checked');
}
```

---

## 6. **`ngAfterViewInit()`**

- **When**: Called **once** after component’s view (and child views) is fully initialized.
- **Purpose**: DOM is ready → perfect for interacting with `@ViewChild` / `@ViewChildren`.
- **Use case**: Manipulating DOM elements, using third-party libraries that need DOM.

```ts
@ViewChild('inputRef') input!: ElementRef;

ngAfterViewInit() {
  this.input.nativeElement.focus();
}
```

---

## 7. **`ngAfterViewChecked()`**

- **When**: Runs **after every change detection** on the component’s view and child views.
- **Purpose**: Perform actions after view updates.
- **Use case**: Rare; useful if DOM keeps changing and you must react.

```ts
ngAfterViewChecked() {
  console.log('View checked');
}
```

---

## 8. **`ngOnDestroy()`**

- **When**: Just before Angular destroys the component.
- **Purpose**: Cleanup.
- **Use case**: Unsubscribe from Observables, detach event listeners, stop timers.

```ts
ngOnDestroy() {
  console.log('Component destroyed');
  this.subscription.unsubscribe();
}
```

---

# 🔀 Execution Order (Creation → Destruction)

1. **`ngOnChanges`** (for each bound input property)
2. **`ngOnInit`** (once)
3. **`ngDoCheck`** (runs often)
4. **`ngAfterContentInit`** (once)
5. **`ngAfterContentChecked`** (after every check)
6. **`ngAfterViewInit`** (once)
7. **`ngAfterViewChecked`** (after every check)
8. **`ngOnDestroy`** (once before destroy)

---

# ⚡ Visual Timeline

```
Creation:
   ngOnChanges → ngOnInit → ngDoCheck
   ngAfterContentInit → ngAfterContentChecked
   ngAfterViewInit → ngAfterViewChecked

Change Detection Cycles:
   ngOnChanges → ngDoCheck
   ngAfterContentChecked
   ngAfterViewChecked

Destruction:
   ngOnDestroy
```

---

# ✅ Best Practices

- Use `ngOnInit` for **initialization logic** (API calls, default data).
- Avoid heavy work in `ngDoCheck` (performance risk).
- Use `ngOnDestroy` to **prevent memory leaks**.
- Use `ngAfterViewInit` when you need **DOM access**.
- Don’t abuse `ngAfterViewChecked` / `ngAfterContentChecked` (they run a lot).
