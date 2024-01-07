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
import { ModalProveedorComponent } from './modal-proveedor/modal-proveedor.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalInventarioComponent,
    ModalProveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule ,
    MatDialogModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
