import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse   } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  constructor(
    private http: HttpClient
  ) { }

  postSingleVote(idAsignarTipoUsuarioEncriptado: string, idConfigurarTipoActorEvaluadoEncriptado: string) {

    const body = new HttpParams()
    .set('idAsignarTipoUsuarioEncriptado', idAsignarTipoUsuarioEncriptado)
    .set('idConfigurarTipoActorEvaluadoEncriptado', idConfigurarTipoActorEvaluadoEncriptado);

     return new Promise((resolve, reject) => {
      this.http.post(url+'Votos/Ingresarvotounico',body.toString(),
        { 
          headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')}
        )
        .subscribe(res => {
            resolve(res);
        }, (err) => {
          reject(err);
      });
  });

}
}
