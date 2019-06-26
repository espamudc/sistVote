import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse   } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }


  
  getEvent(idAsignarTipoUsuarioEncriptado: any, codigoevento: any)
  {
    const urlApi = url+`ConfigurarEvento/Filtrarconfigurareventoporcodigoevento?idAsignarTipoUsuarioEncriptado=${idAsignarTipoUsuarioEncriptado}&codigoevento=${codigoevento}`;
    return new Promise(resolve => {
      this.http.get(urlApi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
