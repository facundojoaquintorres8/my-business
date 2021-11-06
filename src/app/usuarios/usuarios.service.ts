import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared/request-util';
import {IUsuario, IUsuarioPassword} from './usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public resourceUrl = SERVER_API_URL + 'api/usuario';
  public passwordUrl = SERVER_API_URL + 'api/cambiarclave';

  constructor(private http: HttpClient) { }

  findAll(filter: any): Observable<HttpResponse<any>> {
    filter['order'] = filter['order'] ? filter['order'] : ['id', 'ASC'];
    const options = createRequestOption(filter);
    return this.http.get<any>(`${this.resourceUrl}`, {params: options, observe: 'response'});

  }
  find(id: number): Observable<HttpResponse<IUsuario>> {
    return this.http.get<IUsuario>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
  create(usuario: IUsuario): Observable<HttpResponse<IUsuario>> {
    return this.http.post<IUsuario>(this.resourceUrl, usuario,{ observe: 'response'});
  }
  update(usuario: IUsuario): Observable<HttpResponse<IUsuario>> {
    return this.http.put<IUsuario>(this.resourceUrl, usuario,{ observe: 'response'});
  }
  delete(id: number): Observable<HttpResponse<any>>{
    return this.http.delete<any>( `${this.resourceUrl}/${id}`, { observe: 'response'});
  }
  updatePassword(usuario: IUsuarioPassword):Observable<any>{
    return this.http.patch<IUsuarioPassword>(this.passwordUrl, usuario, {observe: 'response'});
  }
}
