import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPage, newPage} from '../shared/page.models';
import {IVenta} from './ventas.model';
import {VentasService} from './ventas.service';

@Component({
    selector: 'app-detail-ventas',
    templateUrl: './detail-ventas.component.html'
})
export class DetailVentaComponent implements OnInit {

    venta!: IVenta;
    page!: IPage;

    constructor(
        private ventasService: VentasService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.ventasService.find(parseInt(id, 10)).subscribe(
                (res: HttpResponse<IVenta>) => this.venta = res.body!
            );

            this.page = newPage({}, ['id', 'ASC']);

        }
    }

    previousState(): void {
        window.history.back();
    }
}
