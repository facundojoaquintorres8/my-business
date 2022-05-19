import {Routes} from '@angular/router';
import {PagingParamsResolve} from '../util/paging-params-resolve';
import {VentasComponent} from './ventas.component';
import {CreateVentaComponent} from './create-ventas.component';
import {DetailVentaComponent} from './detail-ventas.component';

export const ventasRoute: Routes = [
    {
        path: '',
        component: VentasComponent,
        resolve: {
            paginParams: PagingParamsResolve
        },
        data: {
            title: 'Ventas'
        }
    },
    {
        path: 'new',
        component: CreateVentaComponent,
        data: {
            title: 'Vender',
        },
    },
    {
        path: ':id/view',
        component: DetailVentaComponent,
        data: {
            title: 'Detalle de Venta',
        },
    }
];
