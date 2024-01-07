import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule],
})

export class InventarioComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id', 'codigo_barra', 'nombre', 'marca', 'cantidad', 'minimo', 'maximo', 'precio_registro', 'precio_venta'];
  dataSource: MatTableDataSource<Inventario>;
  inventario: Inventario[] = [];
  posicion: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.inventario = [];
    this.infoInventario();

  }
  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  infoInventario() {
    this.inventarioServices.getAllInventario().subscribe(data => {
      this.inventario = data;
      this.dataSource = new MatTableDataSource<Inventario>(this.inventario);
      this.dataSource.paginator = this.paginator;
    },
      (error: any) => {
        this.openSnackBarError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    );
  }

  obtenerElementoPosicion(posicion: number) {
    this.posicion = posicion;
    const datosActuales = this.inventario;
    const elementoEliminado = datosActuales[posicion];
    this.openDialogSearchProducts(elementoEliminado, 'update');
  }

  constructor(public dialog: MatDialog,
    private inventarioServices: InventarioServicesService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<ModalInventarioComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.inventario = [];
  }


  openDialogSearchProducts(elemento: any, action: string) {
    const dialogRef = this.dialog.open(ModalInventarioComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
      data: {
        action: action,
        data: elemento
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        // Acción para guardar
        this.inventarioServices.saveInventario(result.data)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoInventario();
          },
            (error: any) => {
              console.log(error.status);
              if (error.status.toString() == '500') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al guardar el inventario. Por favor, inténtalo de nuevo.');
              }
            }
          );
      } else if (result && result.action === 'update') {
        this.posicion = elemento.id;

        this.inventarioServices.updateInventario(this.posicion, elemento)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoInventario();
          },
            (error: any) => {
              console.log(error.status);
              if (error.status.toString() == '500' || '404') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al actualizar el inventario. Por favor, inténtalo de nuevo.');
              }
            })
      } else if (result && result.action === 'delete') {
        this.posicion = elemento.id;

        this.inventarioServices.inactivarInventario(this.posicion)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoInventario();
          },
            (error: any) => {
              console.log(error.status);
              if (error.status.toString() == '500' || '404') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al elimiar el inventario. Por favor, inténtalo de nuevo.');
              }
            })
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


  openSnackBarError(msjResponse: string) {
    this._snackBar.open(msjResponse, 'cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

