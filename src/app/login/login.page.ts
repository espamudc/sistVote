import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LoginService } from '../../providers/login-service.service';
import { Storage } from '@ionic/storage';
import { ModalLoginPage } from '../modal-login/modal-login.page';

 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

_tiposUsuarios : any = [];
_mensaje : string = "";
_validar : boolean = true;

  constructor(    
    public navCtrl: NavController,
    public loginService:LoginService,
    private storage: Storage,
    public modalController: ModalController
    ) { }




  public objLogin  = {identificacion: "", contrasena: ""};


  ngOnInit() {

  }


  async cargarModal (data: any)
  {
      const modal = await this.modalController.create({
        component: ModalLoginPage,
        componentProps: { tipoUsuario: data }
      });
      return await modal.present();
  }

  
  postLoginFormulario()
  {
    var _objLogin = this.objLogin;
    this.loginService.postLogin(_objLogin.identificacion,_objLogin.contrasena)
    .then(data =>{
       if(data._validar==true){
        this._tiposUsuarios = data._objeto[0]._objetoAsignarTipoUsuario;

        this.cargarModal(this._tiposUsuarios);
       }       
        this._validar = data._validar;
        this._mensaje=data._mensaje;   
    });
  } 


 

}



 

