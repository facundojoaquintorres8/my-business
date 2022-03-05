import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared/request-util';
import {IProducto, IProductoUpdate} from './productos.models';

@Injectable({providedIn: 'root'})
export class ProductoService {
    public resourceUrl = SERVER_API_URL + 'api/productos';

    constructor(private http: HttpClient) {
    }

    findAll(filter: any): Observable<HttpResponse<any>> {
        filter['order'] = filter['order'] ? filter['order'] : ['descripcion', 'ASC'];
        const options = createRequestOption(filter);
        return this.http.get<any>(`${this.resourceUrl}`, {params: options, observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<IProducto>> {
        return this.http.get<IProducto>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    create(producto: IProductoUpdate): Observable<HttpResponse<IProducto>> {
        return this.http.post<IProducto>(this.resourceUrl, producto, {observe: 'response'});
    }

    update(producto: IProductoUpdate): Observable<HttpResponse<IProducto>> {
        return this.http.put<IProducto>(this.resourceUrl, producto, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
