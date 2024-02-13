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

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule, MatGridListModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule,],
})

export class VentasComponent implements OnInit, OnDestroy {
  codigoBarras: string = '';
  displayedColumns: string[] = ['codigo_barra', 'nombre_producto', 'cantidad', 'precio_unitario', 'precio_total'];
  dataSource: MatTableDataSource<PeriodicElement>;
  DatosSubscription: Subscription;
  valorTotal: number = 0;
  subTotalInput: number = 0;
  TotalPagarInput: number = 0;
  DineroInput: number = 0;
  vueltoInput: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ventasService: VentasService) { }

  ngOnInit() {
    this.DatosSubscription = this.ventasService.tusDatos$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.DatosSubscription.unsubscribe();
  }

  leerCodigoDeBarras() {
    console.log('Código de Barras escaneado:', this.codigoBarras);
    this.agregarNuevoElemento();
    this.codigoBarras = '';
  }

  agregarNuevoElemento() {
    const nuevoElemento = {
      codigo_barra: '0994550193',
      nombre_producto: 'Hydrogen',
      cantidad: 5,
      precio_unitario: 10.00,
      precio_total: 7,
    };

    this.ventasService.agregarElemento(nuevoElemento);
    this.subTotalInput = this.ventasService.obtenerSumaTotal();
    this.TotalPagarInput = this.subTotalInput
    this.vueltoInput = this.DineroInput - this.TotalPagarInput;
  }

  vueltoCobro() {
    this.vueltoInput = this.DineroInput - this.TotalPagarInput;
  }

  eliminarElementoPosicion(posicion: number) {
    this.ventasService.eliminarElementoPosicion(posicion);
    this.subTotalInput = this.ventasService.obtenerSumaTotal();
    this.TotalPagarInput = this.subTotalInput;
    this.vueltoInput = this.DineroInput - this.TotalPagarInput;
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

    console.log(JSON.stringify(cobrarVenta));
  }
}

