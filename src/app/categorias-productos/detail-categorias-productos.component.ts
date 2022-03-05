import {HttpResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ICategoriaProducto} from './categorias-productos.models';
import {CategoriaProductoService} from './categorias-productos.service';
import {DeleteCategoriaProductoModalComponent} from './delete-categorias-productos-modal.component';

@Component({
    selector: 'app-detail-categorias-productos',
    templateUrl: './detail-categorias-productos.component.html'
})
export class DetailCategoriaProductoComponent implements OnInit {
    categoriaProducto!: ICategoriaProducto;
    private ngbModalRef: NgbModalRef | undefined;

    constructor(
        private categoriaProductoService: CategoriaProductoService,
        private activatedRoute: ActivatedRoute,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.categoriaProductoService.find(parseInt(id, 10)).subscribe(
                (res: HttpResponse<ICategoriaProducto>) => this.categoriaProducto = res.body!
            );
        }
    }

    delete(id: number): void {
        this.ngbModalRef = this.modalService.open(DeleteCategoriaProductoModalComponent, {
            size: 'lg',
            backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.id = id;
        this.ngbModalRef.result.then(
            () => {
                this.previousState();
            },
            () => {
                this.ngbModalRef = undefined;
            }
        );
    }

    previousState(): void {
        window.history.back();
    }
}
