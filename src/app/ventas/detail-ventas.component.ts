import { Component, OnInit } from '@angular/core';
import { ItemsVentas, IVentas } from './ventas.model';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { VentasService } from './ventas.service';
import { ICliente } from '../clientes/clientes.models';

@Component({
  selector: 'app-ventas',
  templateUrl: './detail-ventas.component.html'
})
export class DetailVentasComponent implements OnInit {
  venta!: IVentas;
  cliente!: ICliente;
  itemsVentas!: ItemsVentas[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ventasService: VentasService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ventasService.find(parseInt(id)).subscribe((res: HttpResponse<IVentas>) => {
        this.venta = res.body!;
        this.cliente = this.venta.cliente;
        this.itemsVentas = this.venta.itemsVentas;
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
}
