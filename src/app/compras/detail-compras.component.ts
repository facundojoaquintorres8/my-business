import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage, newPage } from '../shared/page.models';
import { ICompra } from './compras.model';
import { ComprasService } from './compras.service';

@Component({
  selector: 'app-detail-compras',
  templateUrl: './detail-compras.component.html'
})
export class DetailCompraComponent implements OnInit {

  compra!: ICompra;
  page!: IPage;

  constructor(
    private comprasService: ComprasService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.comprasService.find(parseInt(id)).subscribe(
        (res: HttpResponse<ICompra>) =>  this.compra = res.body!
      );

      this.page = newPage({}, ['id', 'ASC']);

    }
  }

  previousState(): void {
    window.history.back();
  }
}
