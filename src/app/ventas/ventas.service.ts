import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/request-util';
import { IVentas } from './ventas.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  public resourceUrl = SERVER_API_URL + 'api/ventas';

  constructor(private http: HttpClient) { }

  findAll(filter: any): Observable<HttpResponse<any>> {
    filter['order'] = filter['order'] ? filter['order'] : ['id', 'ASC'];
    const options = createRequestOption(filter);
    return this.http.get<any>(`${this.resourceUrl}`, { params: options, observe: 'response' });

  }

  find(id: number): Observable<HttpResponse<IVentas>> {
    return this.http.get<IVentas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
