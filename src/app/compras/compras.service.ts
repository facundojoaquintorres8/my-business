import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/request-util';
import { ICompra, ICompraCreate } from './compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  public resourceUrl = SERVER_API_URL + 'api/compra';

  constructor(private http: HttpClient) { }

  findAll(filter: any): Observable<HttpResponse<any>> {
    filter['order'] = filter['order'] ? filter['order'] : ['id', 'ASC'];
    const options = createRequestOption(filter);
    return this.http.get<any>(`${this.resourceUrl}`, { params: options, observe: 'response' });
  }

  create(compra: ICompraCreate): Observable<HttpResponse<ICompra>> {
    return this.http.post<ICompra>(this.resourceUrl, compra, { observe: 'response' });
  }

}
