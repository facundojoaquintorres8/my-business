import {Component, OnInit} from '@angular/core';
import {IDetailVenta} from './ventas.model';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {VentasService} from './ventas.service';
import {ICliente} from '../clientes/clientes.models';

@Component({
  selector: 'app-ventas',
  templateUrl: './detail-ventas.component.html'
})
export class DetailVentasComponent implements OnInit{
  venta!: IDetailVenta;
  cliente!: ICliente;

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
        console.log('Venta encontrada: ', this.venta);
        console.log('Cliente encontrado: ', this.cliente);
      });
    }
  }
  previousState(): void{
    window.history.back(); // ¿ Aprovecha una propiedad del DOM?
  }
}
