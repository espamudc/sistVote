import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../providers/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(    
    public navCtrl: NavController,
    public loginService:LoginService
    ) { }



    // public objLogin  = new URLSearchParams();
    public objLogin  = {identificacion: "", contrasena: ""};


  ngOnInit() {
  
  }

  
  postLoginFormulario()
  {
    var _objLogin = this.objLogin;
    this.loginService.postLogin(_objLogin.identificacion,_objLogin.contrasena)
    .then(data =>{
      console.log(data);
    });
  } 

 

}



 

