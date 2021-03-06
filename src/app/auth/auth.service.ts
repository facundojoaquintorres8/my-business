import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { IUsuarioLogin } from '../usuarios/usuarios.models';
import { ILoginUser, ISessionUser } from './auth.models';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public resourceUrl = SERVER_API_URL + 'api/login';

    constructor(private http: HttpClient) {
    }

    login(usuarioLogin: IUsuarioLogin): Observable<HttpResponse<ILoginUser>> {
        return this.http.post<ILoginUser>(`${this.resourceUrl}`, usuarioLogin, { observe: 'response' });
    }

    public onLoginSuccess(loginUser: ILoginUser): void {
        this.setSessionUser(loginUser.user);
        this.setToken(loginUser.token);
    }

    public getSessionUser(): ISessionUser {
        return JSON.parse(localStorage.getItem('user')!);
    }

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    public getPermissions(): string {
        let sessionUserPermission: string;

        sessionUserPermission = this.getSessionUser().rol;

        return sessionUserPermission;
    }

    public logout(): void {
        localStorage.clear();
    }

    private setSessionUser(user: ISessionUser): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    private setToken(jwt: string): void {
        localStorage.setItem('token', jwt);
    }
}
