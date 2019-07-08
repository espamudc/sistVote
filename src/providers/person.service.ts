import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse   } from '@angular/common/http';
import { url } from '../environments/environment';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

    getTypeIdentification()
    {
      const urlApi = url+`usuario/cargarcombosusuarioinvitado`;
      return new Promise((resolve, reject) => {
        this.http.get(urlApi).subscribe(data => {
          resolve(data);
        }, err => {
          reject(err);
        });
      });
    }

    postInsertInvitado(data:any)
    {
      const body = new HttpParams()
      .set('_idTipoIdentificacionEncriptado', data._idTipoIdentificacionEncriptado)
      .set('identificacion', data.identificacion)
      .set('primerNombre', data.primerNombre)
      .set('primerApellido', data.primerApellido)
      .set('contrasena', data.contrasena)
      .set('repetirContrasena', data.repetirContrasena);
      const urlApi = url+`usuario/ingresarusuarioinvitado`;
      return new Promise((resolve, reject) => {
        this.http.post(urlApi,body,this.httpOptions).subscribe(data => {
          resolve(data);
        }, err => {
          debugger
          reject(err);
        });
      });
    }
 

}
