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
import { MatInputModule } from '@angular/material/input';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from 'src/app/model/Categoria.model';
import { ModalCategoriaComponent } from 'src/app/componentes_eventos/modal-categoria/modal-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDividerModule, MatCardModule, MatFormFieldModule],
})


export class CategoriaComponent {
  filtro: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['id', 'nombre'];
  dataSource: MatTableDataSource<Categoria>;//4546
  categoria: Categoria[] = [];
  posicion: number;
  txt_categorias: String;



  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<ModalInventarioComponent>,
    private _snackBar: MatSnackBar,
    private categoriaServices: CategoriaService
  ) {
    this.categoria = [];
  }

  ngOnInit(): void {
    this.categoria = [];
    this.infoProveedores();
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  infoProveedores() {
    this.categoriaServices.obtenerCategoria().subscribe(
      (data: any) => {
        this.categoria = data;
        this.dataSource = new MatTableDataSource<Categoria>(this.categoria);
        this.dataSource.paginator = this.paginator;
      }, (error: any) => {
        console.log(error);
      }
    );
    this.categoriaServices.obtenerCategoria().subscribe(data => {
      this.categoria = data;
      this.dataSource = new MatTableDataSource<Categoria>(this.categoria);
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
    const datosActuales = this.categoria;
    const elementoEliminado = datosActuales[posicion];
    this.openDialogSearchProducts(elementoEliminado, 'update');
  }

  openDialogSearchProducts(elemento: any, action: string) {
    const dialogRef = this.dialog.open(ModalCategoriaComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
      data: {
        action: action,
        data: elemento,
        dataProveedor: this.categoria
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        console.log(result.data);
        // Acción para guardar
        this.categoriaServices.guardarCategoria(result.data)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoProveedores();
          },
            (error: any) => {
              if (error.status.toString() == '500') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al guardar. Por favor, inténtalo de nuevo.');
              }
            }
          );
      } else if (result && result.action === 'update') {
        this.posicion = elemento.id;
        this.categoriaServices.actualizarCategoria(this.posicion, result.data)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoProveedores();
          },
            (error: any) => {
              if (error.status.toString() == '500' || '404') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al actualizar. Por favor, inténtalo de nuevo.');
              }
            })
      } else if (result && result.action === 'delete') {
        this.posicion = elemento.id;

        this.categoriaServices.inactivarCategoria(this.posicion)
          .subscribe(data => {
            this.openSnackBar(JSON.stringify(data));
            this.infoProveedores();
          },
            (error: any) => {
              if (error.status.toString() == '500' || '404') {
                this.openSnackBarError(Object.values(error.error).toString());
              } else {
                this.openSnackBarError('Ocurrió un error al elimiar. Por favor, inténtalo de nuevo.');
              }
            })
      }
    });

  }

}
