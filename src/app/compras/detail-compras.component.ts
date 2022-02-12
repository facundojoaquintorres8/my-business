// import { HttpResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { IProveedor } from './compras.models';
// import { ProveedorService } from './compras.service';
// import { DeleteProveedorModalComponent } from './delete-compras-modal.component';

// @Component({
//   selector: 'app-detail-compras',
//   templateUrl: './detail-compras.component.html'
// })
// export class DetailProveedorComponent implements OnInit {
//   private ngbModalRef: NgbModalRef | undefined;

//   proveedor!: IProveedor;

//   constructor(
//     private productoService: ProveedorService,
//     private activatedRoute: ActivatedRoute,
//     private modalService: NgbModal,
//   ) {}

//   ngOnInit(): void {
//     const id = this.activatedRoute.snapshot.paramMap.get("id");
//     if (id) {
//       this.productoService.find(parseInt(id)).subscribe(
//         (res: HttpResponse<IProveedor>) =>  this.proveedor = res.body!
//       );
//     }
//   }

//   delete(id: number): void {
//     this.ngbModalRef = this.modalService.open(DeleteProveedorModalComponent, { size: 'lg', backdrop: 'static' });
//     this.ngbModalRef.componentInstance.id = id;
//     this.ngbModalRef.result.then(
//       () => {
//         this.previousState();
//       },
//       () => {
//         this.ngbModalRef = undefined;
//       }
//     );
//   }

//   previousState(): void {
//     window.history.back();
//   }
// }
