import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Inventario } from 'src/app/model/InventarioModel.model';
import { Proveedor } from 'src/app/model/ProveedoresModel.model';

@Component({
  selector: 'app-modal-proveedor',
  templateUrl: './modal-proveedor.component.html',
  styleUrls: ['./modal-proveedor.component.css']
})
export class ModalProveedorComponent implements OnInit {
  selected = 'option2';
  inventario: Inventario[] = [];
  proveedores: Proveedor[] = [];

  txt_marca: string = '';
  txt_producto: string = '';
  txt_proveedor: string = '';
  txt_contacto: string = '';
  isLoading:true;
  
  action: string = 'save';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {
    this.obtenerInformacion(this.data.data);
    this.action = this.data.action;
    this.proveedores = this.data.dataProveedor;
  }



  obtenerInformacion(data: Proveedor) {
    this.txt_marca = data.marca;
   // this.txt_producto = data.producto;
    this.txt_proveedor = data.proveedor;
    this.txt_contacto = data.contacto;

   
  }


  saveOrUpdate(action: string) {
    const nuevoInventario = new Proveedor();
    nuevoInventario.marca = this.txt_marca;
   // nuevoInventario.producto = this.txt_producto;
    nuevoInventario.proveedor = this.txt_proveedor;
    nuevoInventario.contacto = this.txt_contacto;
   
    
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



  soloTexto(event: KeyboardEvent) {
    // Permitir las teclas de control como Enter, Flechas, etc.
    if ([46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
      // Permitir: Ctrl+A
      (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: Ctrl+C
      (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: Ctrl+V
      (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: Ctrl+X
      (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // No hacer nada, dejar que las teclas de control continúen su curso
      return;
    }
    // Asegurarse de que no es un número
    if ((event.shiftKey || (event.keyCode < 65 || event.keyCode > 90)) &&
      (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
}
