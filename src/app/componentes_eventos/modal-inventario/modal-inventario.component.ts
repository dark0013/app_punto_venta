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

    // this.dialogRef.close('Hola');
  }
  back() {
    this.dialogRef.close('');
  }
}