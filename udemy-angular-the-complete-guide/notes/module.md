# module

root module (AppModule)
RoutingModule imports:[RouterModule.forRoot(appRoutes)], exports: [RouterModule]
feature module imports:[RouterModule.forChild(routes)], exports: [RouterModule]
core module providers: [services]

BrowserModule only in AppModule
CommonModule -> ngIf, ngFor

### eager loading: default

### lazy loading: initial bundle size

1. {path: ''} in RecipesModule
2. delete from `imports: [RecipesModule]` array of AppModule
3. {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'} in AppRoutingModule
   {path: 'recipes', loadChildren: ()=>import('./recipes/recipes.module).then(m=>m.RecipesModule)} in AppModule

### preloading

1. `imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})]` in AppModule

## Service and Modules

- AppModule (root)
- AppComponent or others component (component tree)
- Eager-loaded module (root) should avoid for confusion
- lazy-loaded module (loaded module)
