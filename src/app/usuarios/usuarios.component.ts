import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from './usuarios.models';
import { UsuariosService } from './usuarios.service';
import { DeleteUsuariosModalComponent } from "./delete-usuarios-modal.component";
import { Roles } from "../util/rolesUsuarios";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  private ngbModalRef: NgbModalRef | undefined;

  collapsedFilter = false;
  page!: IPage;
  myForm = this.fb.group({
    usuario: [null],
    clave: [null],
    rol: [null],
    verInactivos: [null]
  });
  rows: IUsuario[] = [];
  loading = false;
  roles = Roles;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams ? data.pagingParams : newPage({ activo: true }, ['id', 'ASC']);
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.transition();
    this.loading = true;
    this.usuariosService.findAll({
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

  onFilter(): void {
    this.page.filter = {};
    if (this.myForm.get(['usuario'])!.value) {
      Object.assign(this.page.filter, {
        usuario: this.myForm.get(['usuario'])!.value.toLowerCase()
      });
    }
    if (this.myForm.get(['rol'])!.value) {
      Object.assign(this.page.filter, {
        rol: this.myForm.get(['rol'])!.value.toLowerCase()
      });
    }
    if (!this.myForm.get(['verInactivos'])!.value) {
      Object.assign(this.page.filter, {
        activo: true
      });
    }
    this.findAll();
  }

  clearFilter(): void {
    this.page.filter = { activo: true };
    this.page = newPage(this.page.filter, this.page.order);
    this.myForm.get(['usuario'])!.setValue('');
    this.myForm.get(['rol'])!.setValue('');
    this.myForm.get(['verInactivos'])!.setValue(false);
    this.findAll();
  }

  onSort(event: any): void {
    this.page.order = [event.sorts[0].prop, event.sorts[0].dir];
    this.findAll();
  }

  setPage(pageInfo: any): void {
    this.page.offset = pageInfo.offset;
    this.findAll();
  }

  transition(): void {
    this.router.navigate(['/usuarios'], {
      queryParams: {
        page: JSON.stringify(this.page)
      },
      replaceUrl: true
    });
  }

  delete(id: number) {
    this.ngbModalRef = this.modalService.open(DeleteUsuariosModalComponent, { size: 'lg', backdrop: 'static' });
    this.ngbModalRef.componentInstance.id = id;
    this.ngbModalRef.result.then(
      () => {
        this.ngbModalRef = undefined;
        this.findAll();
      },
      () => {
        this.ngbModalRef = undefined;
      }
    )
  }

}
