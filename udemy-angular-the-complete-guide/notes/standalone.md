standalone component/directive

standalone: true
imports: []
providers: [Service]

root standalone component: bootstrapApplication

service
in standalone component: providers:[Service]
in main.ts: bootstrapApplication(AppComponent, {providers: [AnalyticsService]});

## routing with standalone

```ts
import { importProvidersFrom } from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule)],
});
```

## lazyloading standalone component

```ts
{
  path: 'about',
  loadComponent: ()=> import('about/about.component').then(c=>c.AboutComponent)
}
```

668, 669
