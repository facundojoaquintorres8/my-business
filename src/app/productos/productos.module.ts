import { NgModule } from '@angular/core';
import { ProductoComponent } from './productos.component';
import { RouterModule } from '@angular/router';
import { productoRoutes } from './productos.route';
import { SharedModule } from '../shared/shared.module';
import { DetailProductoComponent } from './detail-productos.component';
import { UpdateProductoComponent } from './update-productos.component';
import { DeleteProductoModalComponent } from './delete-productos-modal.component';
import { AddQuickProductoModalComponent } from './add-quick-productos-modal.component';

@NgModule({
  declarations: [
    ProductoComponent,
    DetailProductoComponent,
    UpdateProductoComponent,
    DeleteProductoModalComponent,
    AddQuickProductoModalComponent],
  imports: [SharedModule, RouterModule.forChild(productoRoutes)],
  entryComponents: [DeleteProductoModalComponent, AddQuickProductoModalComponent]
})
export class ProductoModule {}
