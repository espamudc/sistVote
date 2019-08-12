import { Component, OnInit } from '@angular/core';
import { NavController, ModalController,MenuController } from '@ionic/angular';
import { LoginService } from '../../providers/login-service.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { authInfo } from "../../environments/environment";
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
    public modalController: ModalController,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
    ) { }




  public objLogin  = {identificacion: "", contrasena: ""};


  ngOnInit() {

  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.storage.remove('idTiposUsuarios');
    this.storage.remove('idAsignarTipoUsuario');
    this.storage.remove('idConfigurarEventoEncriptado');
    this.storage.remove('idConfigurarTipoActorEvaluadoEncriptado');
    this.storage.remove('idAsignarCategoriaConfigurarEvento');
  }

  
 async postLoginFormulario()
  {
    
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Iniciando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();

    var _objLogin = this.objLogin;
    this.loginService.postLogin(_objLogin.identificacion,_objLogin.contrasena)
    .then(data =>
      {
       if(data['_validar']==true){
        this._tiposUsuarios = data['_objeto'][0]._objetoAsignarTipoUsuario;
        this.storage.set('idTiposUsuarios', this._tiposUsuarios);
        loading.dismiss();
        authInfo.authenticated= true;
        this.navCtrl.navigateForward(['/options/']);
       }       
       loading.dismiss();
        this._validar = data['_validar'];
        this._mensaje=data['_mensaje'];   
      }).catch(erro=>{
          console.log(erro);
          loading.dismiss();
      });
  }  

}



 

