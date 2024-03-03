import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/Categoria.model';
import { Inventario } from 'src/app/model/InventarioModel.model';
import { Proveedor } from 'src/app/model/ProveedoresModel.model';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {
  selected = 'option2';
  inventario: Inventario[] = [];
  //proveedores: Proveedor[] = [];
  proveedores: Categoria[] = [];

  txt_categorias: string = '';

  txt_marca: string = '';
  txt_producto: string = '';
  txt_proveedor: string = '';
  txt_contacto: string = '';

  action: string = 'save';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {
    console.log("www");
    console.log(this.data);
    this.obtenerInformacion(this.data.data);
     this.action = this.data.action;
    this.proveedores = this.data.dataProveedor;
  }



  obtenerInformacion(data: Categoria) {
    console.log(data);
    this.txt_categorias = data.nombre;
    


  }


  saveOrUpdate(action: string) {
    const nuevoInventario = new Categoria();
    nuevoInventario.nombre = this.txt_categorias;
    console.log(action);

    /*   nuevoInventario.usuario_registro = 'ADMIN';
      nuevoInventario.usuario_actualiza = 'ADMIN'; */

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
