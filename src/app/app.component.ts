import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  moduloMenu: any[] = [
    { modulo: 'INVENTARIO', submodulo: 'Gestionar Inventario', ruta: '/inventario', icono: 'inventory' },
    { modulo: 'VENTAS', submodulo: 'Ventas', ruta: '/ventas', icono: 'sell' },
    { modulo: 'PROVEEDOR', submodulo: 'Proveedor', ruta: '/proveedor', icono: 'face' },
    { modulo: 'CATEGORIA', submodulo: 'Categoria', ruta: '/categoria', icono: 'category' }
  ];
  showFiller = false;
  panelOpenState = false;
}
