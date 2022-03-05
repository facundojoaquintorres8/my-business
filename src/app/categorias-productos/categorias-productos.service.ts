import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared/request-util';
import {ICategoriaProducto} from './categorias-productos.models';

@Injectable({providedIn: 'root'})
export class CategoriaProductoService {
    public resourceUrl = SERVER_API_URL + 'api/categorias-productos';

    constructor(private http: HttpClient) {
    }

    findAll(filter: any): Observable<HttpResponse<any>> {
        filter['order'] = filter['order'] ? filter['order'] : ['descripcion', 'ASC'];
        const options = createRequestOption(filter);
        return this.http.get<any>(`${this.resourceUrl}`, {params: options, observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<ICategoriaProducto>> {
        return this.http.get<ICategoriaProducto>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    create(categoriaProducto: ICategoriaProducto): Observable<HttpResponse<ICategoriaProducto>> {
        return this.http.post<ICategoriaProducto>(this.resourceUrl, categoriaProducto, {observe: 'response'});
    }

    update(categoriaProducto: ICategoriaProducto): Observable<HttpResponse<ICategoriaProducto>> {
        return this.http.put<ICategoriaProducto>(this.resourceUrl, categoriaProducto, {observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
