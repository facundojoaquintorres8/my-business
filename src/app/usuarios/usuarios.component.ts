import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { IPage, newPage, totalPages } from '../shared/page.models';
import { ActivatedRoute, Router } from '@angular/router';
import {IUsuario} from './usuarios.models';
import {UsuariosService} from './usuarios.service';
import {DeleteUsuariosModalComponent} from "./delete-usuarios-modal.component";

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private modalService: NgbModal,
    private fb: FormBuilder)
  {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams ? data.pagingParams : newPage({activo: true}, ['id', 'ASC']);
    }); //¿Que es el pagingParams??
  }

  ngOnInit(): void {
    this.findAll();
  }


  findAll(): void {
    this.transition();
    this.loading = true;
    this.usuariosService.findAll({
      ...this.page.filter, //¿Porque pone tres puntos?
      ...{
        offset: this.page.offset,
        order: this.page.order
      }
    }).subscribe(res => {
      this.rows = res.body.rows;
      console.log('body rows: ',res.body.rows);
      console.log('rows', this.rows);
      this.loading = false;
      this.page.totalElements = res.body.count;
      this.page.totalPages = totalPages(this.page.size, this.page.totalElements);
    },() => this.loading = false);

  }

  transition():void { // ¿¿para que sirve este metodo?
    this.router.navigate(['/usuarios'],{
      queryParams: {
        page: JSON.stringify(this.page)
      },
      replaceUrl: true
    });

  }
  delete(id: number){
    this.ngbModalRef = this.modalService.open(DeleteUsuariosModalComponent, {size: 'lg', backdrop: 'static'});
    this.ngbModalRef.componentInstance.id = id;
    this.ngbModalRef.result.then(
      ()=> {
        this.ngbModalRef = undefined;
        this.findAll();
      },
      ()=>{
        this.ngbModalRef = undefined;
      }
    )

  }

}
