import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const routes: Routes = [
  { path: '', redirectTo: 'inventario', pathMatch: 'full' },
  {path:'inventario',component:InventarioComponent},
  {path:'ventas',component:VentasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
