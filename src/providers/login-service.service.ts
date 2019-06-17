import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse   } from '@angular/common/http';
import { url } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }


  postLogin(identificacion, contrasena) {

      const body = new HttpParams()
      .set('identificacion', identificacion)
      .set('contrasena', contrasena);

      console.log(body);
       return new Promise((resolve, reject) => {
        this.http.post(url+'Login/Login',body.toString(),
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
