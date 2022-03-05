import {ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {IPage, newPage} from '../shared/page.models';

@Injectable({providedIn: 'root'})
export class PagingParamsResolve {
    resolve(route: ActivatedRouteSnapshot): any {
        const paramsPage: IPage = route.queryParams['page'] ? JSON.parse(route.queryParams['page']) : undefined;

        return paramsPage ? newPage(paramsPage.filter, paramsPage.order) : undefined;
    }
}
