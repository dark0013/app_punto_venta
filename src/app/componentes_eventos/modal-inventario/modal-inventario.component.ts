import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Inventario } from 'src/app/model/InventarioModel.model';


@Component({
  selector: 'app-modal-inventario',
  templateUrl: './modal-inventario.component.html',
  styleUrls: ['./modal-inventario.component.css']
})
export class ModalInventarioComponent implements OnInit {
  selected = 'option2';
  inventario: Inventario[] = [];
  txt_cod_barra: string = '';
  txt_nombre: string = '';
  txt_marca: string = '';
  txt_cantidad: string = '0';
  txt_cost_registro: string = '0.00';
  txt_minimo: string = '0';
  txt_maximo: string = '0';
  txt_precio_venta: string = '0.00';
  action:string= 'save';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.obtenerInformacion(this.data.data);
    this.action = this.data.action;
  }

  obtenerInformacion(data: Inventario) {
    this.txt_cod_barra = data.codigo_barra;
    this.txt_nombre = data.nombre;
    this.txt_marca = data.marca;
    this.txt_cantidad = data.cantidad;
    this.txt_minimo = data.minimo;
    this.txt_maximo = data.maximo;
    this.txt_cost_registro = data.precio_registro;
    this.txt_precio_venta = data.precio_venta;
  }

  saveOrUpdate(action: string) {
    const nuevoInventario = new Inventario();
    nuevoInventario.codigo_barra = this.txt_cod_barra;
    nuevoInventario.nombre = this.txt_nombre;
    nuevoInventario.marca = this.txt_marca;
    nuevoInventario.cantidad = this.txt_cantidad;
    nuevoInventario.minimo = this.txt_minimo;
    nuevoInventario.maximo = this.txt_maximo;
    nuevoInventario.precio_registro = this.txt_cost_registro;
    nuevoInventario.precio_venta = this.txt_precio_venta;
    nuevoInventario.usuario_registro = 'ADMIN';
    nuevoInventario.usuario_actualiza = 'ADMIN';

    this.dialogRef.close({ action: action, data: nuevoInventario });
  }

  back() {
    this.dialogRef.close('X');
  }

  soloNumeros(evt) {
    var code = (evt.which) ? evt.which : evt.keyCode;
    if (code == 8 || code == 46 || code == 44) {
      // backspace
      return true;
    } else if (code >= 48 && code <= 57) {
      // is a number
      return true;
    } else {
      return false;
    }
  }
}
