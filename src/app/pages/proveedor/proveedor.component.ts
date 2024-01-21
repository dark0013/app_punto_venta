import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { Inventario } from 'src/app/model/InventarioModel.model';
import { Proveedor } from 'src/app/model/ProveedoresModel.model';
import { MatInputModule } from '@angular/material/input';
import { ModalProveedorComponent } from 'src/app/componentes_eventos/modal-proveedor/modal-proveedor.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule, MatFormFieldModule],
})
export class ProveedorComponent {
  filtro: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id', 'marca', 'producto', 'proveedor', 'contacto'];
  dataSource: MatTableDataSource<Proveedor>;
  inventario: Inventario[] = [];
  provedor: Proveedor[] = [];
  posicion: number;



  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    private inventarioServices: InventarioServicesService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<ModalInventarioComponent>,
    private _snackBar: MatSnackBar,
    private proveedorServices: ProveedorService
  ) {
    this.provedor = [];
  }

  ngOnInit(): void {
    this.provedor = [];
    this.infoProveedores();
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }
  infoProveedores() {
    this.proveedorServices.getAllProveedor().subscribe(data => {
      this.provedor = data;
      this.dataSource = new MatTableDataSource<Proveedor>(this.provedor);
      this.dataSource.paginator = this.paginator;
    },
      (error: any) => {
        this.openSnackBarError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    );
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

  obtenerElementoPosicion(posicion: number) {
    this.posicion = posicion;
    const datosActuales = this.provedor;
    const elementoEliminado = datosActuales[posicion];
    console.log(posicion);
    this.openDialogSearchProducts(elementoEliminado, 'update');
  }

  openDialogSearchProducts(elemento: any, action: string) {
    const dialogRef = this.dialog.open(ModalProveedorComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
      data: {
        action: action,
        data: elemento,
        dataProveedor: this.provedor
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        // Acción para guardar
        this.proveedorServices.saveProveedor(result.data)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoProveedores();
          },
            (error: any) => {
              if (error.status.toString() == '500') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al guardar el proveedor. Por favor, inténtalo de nuevo.');
              }
            }
          );
      } else if (result && result.action === 'update') {
        this.posicion = elemento.id;
        this.proveedorServices.updateProveedor(this.posicion, result.data)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoProveedores();
          },
            (error: any) => {
              if (error.status.toString() == '500' || '404') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al actualizar el proveedor. Por favor, inténtalo de nuevo.');
              }
            })
      } else if (result && result.action === 'delete') {
        this.posicion = elemento.id;

        this.proveedorServices.inactivarProveedor(this.posicion)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoProveedores();
          },
            (error: any) => {
              if (error.status.toString() == '500' || '404') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al elimiar el proveedor. Por favor, inténtalo de nuevo.');
              }
            })
      }
    });

  }

}
