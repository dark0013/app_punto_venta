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
    console.log(data);
    this.txt_marca = data.marca;
    this.txt_producto = data.producto;
    this.txt_proveedor = data.proveedor;
    this.txt_contacto = data.contacto;

   
  }


  saveOrUpdate(action: string) {
    const nuevoInventario = new Proveedor();
    nuevoInventario.marca = this.txt_marca;
    nuevoInventario.producto = this.txt_producto;
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
}
