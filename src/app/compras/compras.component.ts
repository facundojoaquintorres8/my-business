import { Component, OnInit } from '@angular/core';
import { ICompra } from './compras.model';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ComprasService } from './compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html'
})
export class CompraComponent implements OnInit {

  collapsedFilter = false;
  page!: IPage;
  myForm = this.fb.group({
    // ClienteDni: [null]
  });
  rows: ICompra[] = [];
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private comprasService: ComprasService,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams ? data.pagingParams : newPage({ activa: true }, ['id', 'ASC']);
    });
  }

  ngOnInit() {
    this.findAll();
  }

  onFilter() {
    this.page.filter = {};

    // if (this.myForm.get(['ClienteDni'])!.value) {
    //   Object.assign(this.page.filter, {
    //     dni: this.myForm.get(['ClienteDni'])!.value.toLowerCase()
    //   });
    // }
    this.findAll();
  }

  findAll(): void {
    this.transition();
    this.loading = true;
    this.comprasService.findAll({
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
    this.page.filter = { activa: true };
    this.page = newPage(this.page.filter, this.page.order);
    // this.myForm.get(['ClienteDni'])!.setValue('');
    this.findAll();
  }

  transition(): void {
    this.router.navigate(['/compras'],
      {
        queryParams: {
          page: JSON.stringify(this.page)
        },
        replaceUrl: true
      });
  }
}
