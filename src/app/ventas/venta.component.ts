import { Component, OnInit } from '@angular/core';
import { IVentas } from './ventas.model';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { VentasService } from './ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html'

})
export class VentaComponent implements OnInit {

  collapsedFilter = false;
  page!: IPage;
  myForm = this.fb.group({
    ClienteDni: [null],
    nomTarjeta: [null],
    numTarjeta: [null],
  });
  rows: IVentas[] = [];
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ventasService: VentasService,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams ? data.pagingParams : newPage({}, ['id', 'ASC']);
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  onFilter(): void {
    this.page.filter = {};

    if (this.myForm.get(['ClienteDni'])!.value) {
      Object.assign(this.page.filter, {
        dni: this.myForm.get(['ClienteDni'])!.value.toLowerCase()
      });
    }
    if (this.myForm.get(['nomTarjeta'])!.value) {
      Object.assign(this.page.filter, {
        nomTarjeta: this.myForm.get(['nomTarjeta'])!.value.toLowerCase()
      });
    }
    if (this.myForm.get(['numTarjeta'])!.value) {
      Object.assign(this.page.filter, {
        numTarjeta: this.myForm.get(['numTarjeta'])!.value.toLowerCase()
      });
    }
    this.findAll();
  }

  findAll(): void {
    this.transition();
    this.loading = true;
    this.ventasService.findAll({
      ...this.page.filter,
      ...{
        offset: this.page.offset,
        order: this.page.order
      }
    }).subscribe(res => {
      this.rows = res.body.rows;
      this.loading = false;
      this.page.totalElements = res.body.count;
      this.page.totalPages = totalPages(this.page.size, this.page.totalElements);
    }, () => this.loading = false);

  }

  onSort(event: any): void {
    this.page.order = [event.sorts[0].prop, event.sorts[0].dir];
    this.findAll();
  }

  setPage(pageInfo: any): void {
    this.page.offset = pageInfo.offset;
    this.findAll();
  }

  clearFilter(): void {
    this.page.filter = {};
    this.page = newPage(this.page.filter, this.page.order);
    this.myForm.get(['ClienteDni'])!.setValue('');
    this.myForm.get(['nomTarjeta'])!.setValue('');
    this.myForm.get(['numTarjeta'])!.setValue('');
    this.findAll();
  }

  transition(): void {
    this.router.navigate(['/ventas'],
      {
        queryParams: {
          page: JSON.stringify(this.page)
        },
        replaceUrl: true
      });
  }
}
