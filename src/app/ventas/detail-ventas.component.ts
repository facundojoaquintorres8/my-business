import {Component, OnInit} from '@angular/core';
import {IDetailVenta} from './ventas.model';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {VentasService} from './ventas.service';
import {ICliente} from '../clientes/clientes.models';
import {Items} from "./items.model";

@Component({
  selector: 'app-ventas',
  templateUrl: './detail-ventas.component.html'
})
export class DetailVentasComponent implements OnInit{
  venta!: IDetailVenta;
  cliente!: ICliente;
  items!: Items[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ventasService: VentasService
  ) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.ventasService.find(parseInt(id)).subscribe((res: HttpResponse<IDetailVenta>) => {
        this.venta = res.body!;
        this.cliente = this.venta.Cliente;
        this.items = this.venta.Items;
      });
    }
  }
  previousState(): void{
    window.history.back();
  }
}
