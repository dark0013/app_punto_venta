import { Component, Inject, OnInit } from '@angular/core';//MatDialogRef
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inventario } from 'src/app/model/InventarioModel.model';
@Component({
  selector: 'app-modal-inventario',
  templateUrl: './modal-inventario.component.html',
  styleUrls: ['./modal-inventario.component.css']
})

export class ModalInventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  txt_cod_barra: string = '';
  txt_nombre: string = '';
  txt_marca: string = '';
  txt_cantidad: string = '';
  txt_cost_registro: string = '';
  txt_minimo: string = '';
  txt_maximo: string = '';
  txt_precio_venta: string = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  ngOnInit() {
    this.data = 5;
    console.log(this.data)
  }
  save() {
    const nuevoInventario = new Inventario();
    nuevoInventario.codigo_barra= this.txt_cod_barra; 
    nuevoInventario.nombre= this.txt_nombre;
    nuevoInventario.marca= this.txt_marca;
    nuevoInventario.cantidad= this.txt_cantidad; 
    nuevoInventario.minimo= this.txt_minimo;
    nuevoInventario.maximo= this.txt_maximo; 
    nuevoInventario.precio_registro= this.txt_cost_registro; 
    nuevoInventario.precio_venta= this.txt_precio_venta; 
    this.dialogRef.close(nuevoInventario);
  }
  back() {
    //this.dialogRef.close('');
    
  }
}
