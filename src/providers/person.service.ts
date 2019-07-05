import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse   } from '@angular/common/http';
import { url } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private http: HttpClient
  ) { }


    getTypeIdentification()
    {
      const urlApi = url+`Usuario/Cargarcombosusuarioinvitado`;
      return new Promise(resolve => {
        this.http.get(urlApi).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
    }

}
