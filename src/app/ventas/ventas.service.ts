import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared/request-util';
import {IVenta, IVentaCreate} from './ventas.model';

@Injectable({
    providedIn: 'root'
})
export class VentasService {
    public resourceUrl = SERVER_API_URL + 'api/ventas';

    constructor(private http: HttpClient) {
    }

    findAll(filter: any): Observable<HttpResponse<any>> {
        filter['order'] = filter['order'] ? filter['order'] : ['fecha', 'DESC'];
        const options = createRequestOption(filter);
        return this.http.get<any>(`${this.resourceUrl}`, {params: options, observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<IVenta>> {
        return this.http.get<IVenta>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    create(compra: IVentaCreate): Observable<HttpResponse<IVenta>> {
        return this.http.post<IVenta>(this.resourceUrl, compra, {observe: 'response'});
    }

}
