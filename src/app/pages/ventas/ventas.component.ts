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
  displayedColumns: string[] = ['position', 'name', 'weight', 'precio_unitario', 'symbol'];
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
      position: '0994550193',
      name: 'Hydrogen',
      weight: 5,
      symbol: 7,
      precio_unitario: 10.00
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
}

