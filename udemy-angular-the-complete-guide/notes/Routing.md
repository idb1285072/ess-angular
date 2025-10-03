Routing

1. const appRoutes:Routes = [
   {path: '', redirectTo:'/home', pathMatch:'full'},
   {path: 'users', component: UsersComponent},
   {path: 'user/:id/:name', component: UserComponent}, //route parameter
   {path: 'not-found', component: NotFoundComponent},
   {path: '**', redirectTo: '/not-found'}
   ]

2. imports: [RouterModule.forRoot(appRoutes, {userHash:true})]

3. <router-outlet>

[routerLink] = "['/users', user.id, 'edit']"
routerLinkActive = "className"
[routerLinkActiveOptions] = "{exact:true}"
[queryParams]="{allowEdit: '1'}"
fragment="loading"

this.router.navigate(['/users'])
this.router.navigate(['users'], {relativeTo: activatedRoute, queryParamsHandling: 'preserve'})
this.router.navigate(['/users', id, edit],{queryParams: {allowEdit: '1'}, fragment: 'loading'})

relative path users append to current path
absolute path /users append to root

this.activatedRoute.snapshot.params['id'] // when url update not fetching again
this.activatedRoute.snapshot.queryParams;
this.activatedRoute.snapshot.fragment;
this.activatedRoute.params.subscribe(
(params:Params)=>{
this.user.id = params['id'];
this.user.name = params['name'];
)

url
route parameter
queryParams
fragment

---

child route

---

const appRoutes:Routes = [
{path:'servers', component: ServersComponent, children:[
{path:':id', component: ServerComponent},
{path: ':id/edit', component: EditServerComponent}
]}
}

<router-outlet> in ServersComponent

---

AppRoutingModule
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]

and import AppRoutingModule in AppModule

---

export class AuthGuard implements CanActivate, CanActivateChild{
canActivate(){}
canActivateChild(){}
}

const appRoutes:Routes = [
{path:'servers', component: ServersComponent, canActivate:[AuthGuard], canActivateChild:[AuthGuard], children:[
{path:':id', component: ServerComponent},
{path: ':id/edit', component: EditServerComponent}
]}
}

## canDeactivate 471.

1.

```ts
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
```

2.

```ts
export class EditComponent implements CanComponentDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if (this.serverName !== this.server.name) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }
}
```

3.

```ts
{path: ':id/edit', component: EditComponent, canDeactivate: [CanDeactivateGuard]}
```

---

passing static data

{path: 'not-found', component:ErrorComponent, data: {message: 'page not found'},
{path: '**', redirectTo:'not-found'}

this.activatedRoute.snapshot.data['message'];

Resolving Dynamic data 473.
