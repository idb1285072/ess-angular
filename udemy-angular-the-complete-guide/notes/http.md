http
url = api endpoint
http verb
headers metadata
body

firebase -> go to console -> real-time database

1. HttpClientModule in module
2. inject HttpClient in service
3. subscribe in component and unsubscribe
rxjs operators: pipe, map, tap
typed: generic methods

showing data
loading indicator: loading.io
error -> throwError, catchError

**********************************************************
setting headers, queryParams
**********************************************************
let searchParams = new HttpParams();
searchParams = searchParams.append('print':'pretty');
searchParams = searchParams.append('custom', 'key');

,{
  headers: new HttpHeaders({'Custom-Header':'Hello'}),
  //params: new HttpParams().set('print', 'pretty'),
  params: searchParams,
  observe: 'body'|'response'|'events',
  responseType: 'json'|'text'|'bolb',
}

event.type === HttpEventType.Sent

*********************************************************
interceptor
*********************************************************
1.
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const updatedReq = req.clone({
      headers: req.headers.append('Auth', 'XYZ'),
    });
    return next.handle(updatedReq).pipe(map(), tap());
  }
}

2. in module
 providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
],

* order of interseptor matters

