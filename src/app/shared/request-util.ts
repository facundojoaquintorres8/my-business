import { HttpParams } from '@angular/common/http';
import { PAGE_LIMIT } from '../app.constants';

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();

    if (req) {
        if (!req['offset']) {
            req['offset'] = 0;
        }
        if (!req['limit']) {
            req['limit'] = PAGE_LIMIT;
        }

        Object.keys(req).forEach(key => {
            if (req[key] !== null) {
                options = options.set(key, req[key]);
            }
        });
    }
    return options;
};
