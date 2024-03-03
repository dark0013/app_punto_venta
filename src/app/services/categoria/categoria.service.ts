import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/model/Categoria.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = `${environment.HOST}/api/categorias`;

  constructor(private http: HttpClient) { }

  obtenerCategoria() {
    return this.http.get<Categoria[]>(this.url);
  }

  guardarCategoria(categoria: Categoria) {
    return this.http.post(this.url, categoria);
  }

  actualizarCategoria(id: number, categoria: Categoria) {
    return this.http.put(`${this.url}/${id}`, categoria);
  }

  inactivarCategoria(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
