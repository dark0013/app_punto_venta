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
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from 'src/app/model/Categoria.model';
import { LoadingComponent } from 'src/app/componentes_eventos/loading/loading.component';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  standalone: true,
  template: `
    <div *ngIf="loading">
      <app-loading *ngIf="loading"></app-loading>
    </div>
    <!-- Tu contenido de inventario aquí -->
  `,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule, MatFormFieldModule],
})

export class InventarioComponent implements OnInit, OnDestroy {
  filtro: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id', 'codigo_barra', 'nombre', 'marca', 'cantidad', 'minimo', 'maximo', 'precio_registro', 'precio_venta'];
  dataSource: MatTableDataSource<Inventario>;
  inventario: Inventario[] = [];
  provedor: Proveedor[] = [];
  categorias: Categoria[] = [];
  posicion: number;
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    private inventarioServices: InventarioServicesService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<ModalInventarioComponent>,
    private _snackBar: MatSnackBar,
    private proveedorServices: ProveedorService,
    private categoriaServices: CategoriaService
  ) {
    this.inventario = [];
  }

  aplicarFiltro() {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.inventario = [];
    this.infoInventario();
    this.infoProveedores();
    this.infoCategoriass();

  }
  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();// Eliminar espacios y convertir a minúsculas
    this.dataSource.filter = value;
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

  infoProveedores() {
    this.proveedorServices.getAllProveedor().subscribe(data => {
      this.provedor = data;
    },
      (error: any) => {
        this.openSnackBarError('Ocurrió un error. Por favor, inténtalo de nuevo.');
      }
    );
  }

  infoCategoriass() {
    this.categoriaServices.obtenerCategoria().subscribe(data => {
      console.log(data)
      this.categorias = data;
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




  openDialogSearchProducts(elemento: any, action: string) {
    const dialogRef = this.dialog.open(ModalInventarioComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
      data: {
        action: action,
        data: elemento,
        dataProveedor: this.provedor,
        dataCategorias: this.categorias
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
              if (error.status.toString() == '500') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al guardar el inventario. Por favor, inténtalo de nuevo.');
              }
            }
          );
      } else if (result && result.action === 'update') {
        this.posicion = elemento.id;
        this.inventarioServices.updateInventario(this.posicion, result.data)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoInventario();
          },
            (error: any) => {
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

