import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  moduloMenu:any[]=[
    {modulo:'INVENTARIO', submodulo:'Gestionar Inventario', ruta:'/inventario',icono:'favorite'},
    {modulo:'VENTAS', submodulo:'Ventas', ruta:'/ventas',icono:'favorite'},
    {modulo:'PROVEEDOR', submodulo:'Proveedor', ruta:'/proveedor',icono:'favorite'}
  ];
  showFiller = false;
  panelOpenState = false;
}
