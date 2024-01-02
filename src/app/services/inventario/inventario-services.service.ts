import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario } from 'src/app/model/InventarioModel.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioServicesService {
  private url: string = `${environment.HOST}/api/getAllInventario`;

  constructor(private http: HttpClient) { }

  getAllInventario() {
    return this.http.get<Inventario[]>(this.url);
  }
}
