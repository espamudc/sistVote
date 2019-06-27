import { Injectable } from '@angular/core';
import {  HttpClient   } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandService {

  constructor(
    private http: HttpClient
  ) { }


  getStands(idAsignarTipoUsuarioEncriptado: string, idConfigurarEventoEncriptado: string)
  {
    const urlApi = url+`AsignarTipoActorEvaluado/Filtrarasignartipoactorevaluadoporevento?idAsignarTipoUsuarioEncriptado=${idAsignarTipoUsuarioEncriptado}&idConfigurarEventoEncriptado=${idConfigurarEventoEncriptado}`;
    return new Promise(resolve => {
      this.http.get(urlApi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


}
