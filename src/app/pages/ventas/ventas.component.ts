import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { PeriodicElement } from '../../model/PeriodicElement.model';
import { VentasService } from '../../services/ventas.service';
import { Subscription } from 'rxjs';
import { Venta } from 'src/app/model/VentaModel.model';
import { PagoVentasService } from 'src/app/services/ventas/pago-ventas.service';
import { LoadingComponent } from '../../componentes_eventos/loading/loading.component'; // Importa LoadingComponent
import { InventarioServicesService } from 'src/app/services/inventario/inventario-services.service';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule, MatGridListModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule,],
})

export class VentasComponent implements OnInit, OnDestroy {
  pagoCumplido: boolean = true;
  loading: boolean = false;

  codigoBarras: string = '';
  displayedColumns: string[] = ['codigo_barra', 'nombre_producto', 'cantidad', 'precio_unitario', 'precio_total'];
  dataSource: MatTableDataSource<PeriodicElement>;
  DatosSubscription: Subscription;
  valorTotal: number = 0;
  subTotalInput: number = 0;
  TotalPagarInput: number = 0;
  DineroInput: number;
  vueltoInput: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ventasService: VentasService,
    private inventario: InventarioServicesService,
    private pagarVenta: PagoVentasService) { }

  ngOnInit() {
    this.DatosSubscription = this.ventasService.tusDatos$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.converitDecimal(this.subTotalInput);
    });

    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.DatosSubscription.unsubscribe();
  }

  leerCodigoDeBarras() {
    this.inventario.getAllInventarioxCodigo(this.codigoBarras).subscribe(data => {

      data.map(elemtos => {
        this.agregarNuevoElemento(elemtos.codigo_barra, elemtos.nombre, parseFloat(elemtos.precio_venta));
      });

      this.codigoBarras = '';
    }, error => {
      console.log(error);
    });
  }

  asignarTotal(cantidad: number, element: any) {
    let precio_unitario = parseFloat(element.precio_unitario);
    let precio_total = cantidad * precio_unitario;
    element.precio_total = precio_total.toFixed(2);
    //console.log(element.precio_total)
    this.actualizarTotalizado();
  }


  actualizarTotalizado() {
    let total = 0;

    const data = 'data' in this.dataSource ? this.dataSource.data : this.dataSource;

    const informacionTabla = data.map(row => ({
      precio_total: row.precio_total !== undefined && row.precio_total !== null ? Number(row.precio_total) : 0
    }));

    console.log("Total:", informacionTabla);

    for (let i = 0; i < informacionTabla.length; i++) {
      total += informacionTabla[i].precio_total;
    }

    this.subTotalInput = total;
    this.TotalPagarInput = this.subTotalInput;

    if (Number(this.DineroInput) <= 0) {
      this.vueltoInput = 0;
    } else {
      this.vueltoInput = Math.abs(this.DineroInput - this.TotalPagarInput);
    }

  }


  converitDecimal(valor: number) {
    return valor.toFixed(2);
  }



  agregarNuevoElemento(codigo_barra: string, nombre_producto: string, precio_unitario: number) {
    const nuevoElemento = {
      codigo_barra: codigo_barra,
      nombre_producto: nombre_producto,
      //cantidad: 5,
      precio_unitario: precio_unitario,
      // precio_total: 7,
    };

    this.ventasService.agregarElemento(nuevoElemento);
    this.subTotalInput = this.ventasService.obtenerSumaTotal();
    this.TotalPagarInput = this.subTotalInput
    this.vueltoInput = Math.abs(this.DineroInput - this.TotalPagarInput);
  }

  vueltoCobro() {
    this.vueltoInput = this.DineroInput - this.TotalPagarInput;

    if (this.TotalPagarInput > this.DineroInput) {
      alert('El valor no cumple con el monto del pago');
      this.vueltoInput = 0;
      this.pagoCumplido = true;
    } else {
      this.pagoCumplido = false;
    }
  }

  eliminarElementoPosicion(posicion: number) {
    this.ventasService.eliminarElementoPosicion(posicion);
    this.actualizarTotalizado();
  }

  CobrarVenta() {
    const data = 'data' in this.dataSource ? this.dataSource.data : this.dataSource;

    // Imprimir por consola la información de la tabla en un objeto
    const informacionTabla = data.map(row => ({
      codigo_barra: row.codigo_barra,
      nombre_producto: row.nombre_producto,
      cantidad: row.cantidad,
      precio_unitario: row.precio_unitario,
      precio_total: row.precio_total
    }));

    const cobrarVenta = new Venta();
    cobrarVenta.valorTotal = this.valorTotal;
    cobrarVenta.subTotalInput = this.subTotalInput;
    cobrarVenta.TotalPagarInput = this.TotalPagarInput;
    cobrarVenta.DineroInput = this.DineroInput;
    cobrarVenta.vueltoInput = this.vueltoInput;
    cobrarVenta.infoArticulos = informacionTabla;


    this.pagarVenta.savePagoVentas(cobrarVenta).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

  }
}

