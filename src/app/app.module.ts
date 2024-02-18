import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';



import { InventarioComponent } from './pages/inventario/inventario.component';
import { MaterialModule } from './material/material.module';
import { ModalInventarioComponent } from './componentes_eventos/modal-inventario/modal-inventario.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ModalProveedorComponent } from './componentes_eventos/modal-proveedor/modal-proveedor.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { LoadingComponent } from './componentes_eventos/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    ModalInventarioComponent,
    ModalProveedorComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
