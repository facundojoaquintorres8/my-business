import { Injectable, OnInit } from '@angular/core'; // imports the class that provides local storage for token
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient, HttpResponse
} from '@angular/common/http';
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import {SERVER_API_URL} from "../app.constants";
import {IUsuarioClave, IUsuarioLogin} from "../usuarios/usuarios.models";

@Injectable({
  providedIn: 'root'
})

export class AuthService implements HttpInterceptor{

  public resourceUrl = SERVER_API_URL + 'api/login';

  constructor(private http: HttpClient) {}

  login(usuarioLogin: IUsuarioLogin): Observable<any>{
    return  this.http.post<IUsuarioLogin>(`${this.resourceUrl}`, usuarioLogin, {observe: 'response'});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress"); // Interception Stage
    const token = localStorage.getItem('token'); // This retrieves a token from local storage
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Catching Error Stage
          if (error && error.status === 401) {
            console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
          }
          const err = error.error.message || error.statusText;
          return throwError(error); // any further errors are returned to frontend
        })
      );
  }

  signIn():Observable<HttpResponse<any>> {
    return  this.http.get<any>(this.resourceUrl);
  }

}
