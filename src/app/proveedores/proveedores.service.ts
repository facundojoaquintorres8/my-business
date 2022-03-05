import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared/request-util';
import {IProveedor} from './proveedores.models';

@Injectable({providedIn: 'root'})
export class ProveedorService {
    public resourceUrl = SERVER_API_URL + 'api/proveedores';

    constructor(private http: HttpClient) {
    }

    findAll(filter: any): Observable<HttpResponse<any>> {
        filter['order'] = filter['order'] ? filter['order'] : ['razonSocial', 'ASC'];
        const options = createRequestOption(filter);
        return this.http.get<any>(`${this.resourceUrl}`, {params: options, observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<IProveedor>> {
        return this.http.get<IProveedor>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    create(proveedor: IProveedor): Observable<HttpResponse<IProveedor>> {
        return this.http.post<IProveedor>(this.resourceUrl, proveedor, {observe: 'response'});
    }

    update(proveedor: IProveedor): Observable<HttpResponse<IProveedor>> {
        return this.http.put<IProveedor>(this.resourceUrl, proveedor, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
