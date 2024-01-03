import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

//andy
import { MatDialog, } from '@angular/material/dialog';
//import { Inject } from '@angular/core';
import { ModalInventarioComponent } from 'src/app/componentes_eventos/modal-inventario/modal-inventario.component';
import { InventarioServicesService } from 'src/app/services/inventario/inventario-services.service';
import { Inventario } from 'src/app/model/InventarioModel.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule],
})

export class InventarioComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id', 'codigo_barra', 'nombre', 'marca', 'cantidad', 'minimo', 'maximo', 'precio_registro', 'precio_venta'];
  dataSource: MatTableDataSource<Inventario>;
  inventario: Inventario[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.inventarioServices.getAllInventario().subscribe(data => {
      this.inventario = data;
      this.dataSource = new MatTableDataSource<Inventario>(this.inventario);
      this.dataSource.paginator = this.paginator;
      console.log(this.inventario);
    });

  }

  constructor(public dialog: MatDialog,
    private inventarioServices: InventarioServicesService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<ModalInventarioComponent>,
    private _snackBar: MatSnackBar
  ) { }


  openDialogSearchProducts(elemento: any) {
    const dialogRef = this.dialog.open(ModalInventarioComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
      data: {
        data: elemento // Corregido aquí: cambié elemnto a elemento
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Añadido un control para asegurarse de que result no sea null o undefined
        this.inventario = result;
        this.inventarioServices.saveInventario(result)
        .subscribe(data => {
          this.openSnackBar(JSON.stringify(data));
        });
      }
    });
  }


  openSnackBar(msjResponse: string) {
    let msj = JSON.parse(msjResponse);
    this._snackBar.open(msj.mensaje, 'cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

