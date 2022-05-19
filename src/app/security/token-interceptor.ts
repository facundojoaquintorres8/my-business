import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token,
                },
            });
        }
        return next.handle(request).pipe(tap(
            (ok: any) => {
                if (token && ok.type !== 0) {
                    if (request.method === 'POST') {
                        this.toastService.changeMessage(
                            {
                                isSuccess: true,
                                message: 'Datos creados correctamente.'
                            }
                        );
                    } else if (request.method === 'PUT') {
                        this.toastService.changeMessage(
                            {
                                isSuccess: true,
                                message: 'Datos modificados correctamente.'
                            }
                        );
                    } else if (request.method === 'DELETE') {
                        this.toastService.changeMessage(
                            {
                                isSuccess: true,
                                message: 'Datos eliminados correctamente.'
                            }
                        );
                    }
                }
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 500) {
                        this.toastService.changeMessage(
                            {
                                isError: true,
                                message: err.error.message,
                            }
                        );
                    }
                    if (err.status === 403) {
                        this.toastService.changeMessage(
                            {
                                isError: true,
                                message: 'No tiene permisos.',
                            }
                        );
                        this.router.navigate(['login']);
                    }
                    if (err.status !== 401) {
                        return;
                    }
                    this.authService.logout();
                    this.router.navigate(['login']);
                }
            }));
    }
}
