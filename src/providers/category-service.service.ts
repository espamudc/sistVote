import { Injectable } from '@angular/core';
import {  HttpClient   } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(idAsignarTipoUsuarioEncriptado: string, idConfigurarEventoEncriptado: string)
  {
    const urlApi = url+`AsignarCategoriaConfigurarEvento/Consultarcategoriasporevento?idAsignarTipoUsuarioEncriptado=${idAsignarTipoUsuarioEncriptado}&idConfigurarEventoEncriptado=${idConfigurarEventoEncriptado}`;
    return new Promise(resolve => {
      this.http.get(urlApi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
