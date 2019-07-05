import { Injectable } from '@angular/core';
import {  HttpClient   } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  constructor(
    private http: HttpClient
  ) { }


  
  getParticipants(idAsignarTipoUsuarioEncriptado: string, idAsignarCategoriaConfigurarEventoEncriptado: string)
  {
    const urlApi = url+`ConfigurarTipoActorEvaluado/Filtrarasignarcategoriaconfigurarevento?idAsignarTipoUsuarioEncriptado=${idAsignarTipoUsuarioEncriptado}&idAsignarCategoriaConfigurarEventoEncriptado=${idAsignarCategoriaConfigurarEventoEncriptado}`;
    return new Promise(resolve => {
      this.http.get(urlApi).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
