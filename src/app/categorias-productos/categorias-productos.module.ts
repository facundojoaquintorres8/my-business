import {NgModule} from '@angular/core';
import {CategoriaProductoComponent} from './categorias-productos.component';
import {RouterModule} from '@angular/router';
import {categoriaProductoRoutes} from './categorias-productos.route';
import {SharedModule} from '../shared/shared.module';
import {DetailCategoriaProductoComponent} from './detail-categorias-productos.component';
import {UpdateCategoriaProductoComponent} from './update-categorias-productos.component';
import {DeleteCategoriaProductoModalComponent} from './delete-categorias-productos-modal.component';

@NgModule({
    declarations: [CategoriaProductoComponent, DetailCategoriaProductoComponent,
        UpdateCategoriaProductoComponent, DeleteCategoriaProductoModalComponent],
    imports: [SharedModule, RouterModule.forChild(categoriaProductoRoutes)],
    entryComponents: [DeleteCategoriaProductoModalComponent]
})
export class CategoriaProductoModule {
}
