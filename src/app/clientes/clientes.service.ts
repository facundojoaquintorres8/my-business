import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/request-util';
import { ICliente } from './clientes.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public resourceUrl = SERVER_API_URL + 'api/clientes';

  constructor(private http: HttpClient) { }

  findAll(filter: any): Observable<HttpResponse<any>> {
    filter['order'] = filter['order'] ? filter['order'] : ['nombre', 'ASC'];
    const options = createRequestOption(filter);
    return this.http.get<any>(`${this.resourceUrl}`, { params: options, observe: 'response' });
  }

  find(dni: string): Observable<HttpResponse<ICliente>> {
    return this.http.get<ICliente>(`${this.resourceUrl}/${dni}`, { observe: 'response' });
  }

  create(cliente: ICliente): Observable<HttpResponse<ICliente>> {
    return this.http.post<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  update(cliente: ICliente): Observable<HttpResponse<ICliente>> {
    return this.http.put<ICliente>(this.resourceUrl, cliente, { observe: 'response' });
  }

  delete(dni: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${dni}`, { observe: 'response' });
  }

}
