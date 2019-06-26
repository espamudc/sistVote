import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LoginService } from '../../providers/login-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

public _tiposUsuarios : any = [];
public _mensaje : string = "";
public _validar : boolean = true;

  constructor(    
    public navCtrl: NavController,
    public loginService:LoginService,
    private storage: Storage,
    public modalController: ModalController
    ) { }




  public objLogin  = {identificacion: "", contrasena: ""};


  ngOnInit() {

  }


  
  postLoginFormulario()
  {
    var _objLogin = this.objLogin;

    this.loginService.postLogin(_objLogin.identificacion,_objLogin.contrasena)
    .then(data =>
      {
       if(data._validar==true){
        this._tiposUsuarios = data._objeto[0]._objetoAsignarTipoUsuario;
        this.storage.set('idTiposUsuarios', this._tiposUsuarios);
        this.navCtrl.navigateForward(['/options/']);
       }       
        this._validar = data._validar;
        this._mensaje=data._mensaje;   
      });
  } 


 

}



 

