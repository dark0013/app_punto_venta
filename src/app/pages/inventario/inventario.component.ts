import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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

export class InventarioComponent implements  OnInit {
  displayedColumns: string[] = ['id', 'codigo_barra', 'nombre', 'marca','cantidad','minimo','maximo','precio_registro','precio_venta'];
  dataSource: MatTableDataSource<Inventario>;
  inventario: Inventario[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.inventarioServices.getAllInventario().subscribe(data => {      
      this.inventario = data;
      this.dataSource = new MatTableDataSource<Inventario>(this.inventario );
      this.dataSource.paginator = this.paginator;
      console.log(this.inventario);
    });

  }

  constructor(public dialog: MatDialog,
    private inventarioServices: InventarioServicesService
    // @Inject(MAT_DIALOG_DATA) public data: any,
    //public dialogRef: MatDialogRef<ModalInventarioComponent>,
  ) { }


  openDialogSearchProducts(elemnto: any) {
    const dialogRef = this.dialog.open(ModalInventarioComponent, {
      width: "600px",
      height: "auto",
      disableClose: true,
      data: {
        data: elemnto
      },
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      /* if (result) {
        if (!this.listproductC?.listProducts.find(i => i.id == result.id)) {
          if (this.data.zone) {
            this.addProduct(result);
          } else {
            this.productService.addProductSelecedt(result);
          }
        } else {
          this.listproductC?.msgProductRepeated();
        }
      } */
    });
  }


}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];