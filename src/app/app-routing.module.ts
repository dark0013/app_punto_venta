import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';

const routes: Routes = [
  { path: '', redirectTo: 'inventario', pathMatch: 'full' },
  {path:'inventario',component:InventarioComponent},
  {path:'ventas',component:VentasComponent},
  {path:'proveedor', component: ProveedorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
