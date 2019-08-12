import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../providers/person.service';
import { ToastController,MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router}  from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  tiposIdentificacion:string;
  tiposexo:string;
  dataRegister:any=[];
  isDisabled: boolean=true;
  constructor(public personService:PersonService,
              private toastController:ToastController,
              public menuCtrl: MenuController,
              public loadingController: LoadingController,
              private route: Router,
 ) { }

  ngOnInit() {
    this.getTypeIden();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  getTypeIden(){
   this.personService.getTypeIdentification().then(data=>{
     this.tiposIdentificacion=data['_objetoTipoIdentificacion'];
     this.tiposexo=data['_objetoSexo'];
   }).catch(error=>{
    this.presentToast(error);
   })
  }

  async  registerInvitado(){
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Votando...',
      translucent: true,
      duration: 5000,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    this.personService.postInsertInvitado(this.dataRegister).then(resp=>{
      this.presentToast(resp["_mensaje"]);
      loading.dismiss();
      this.route.navigate(['/login']);
    }).catch(error=>{
      this.presentToast(error);
      loading.dismiss();
    })
  }
  selectDisable(){
    this.isDisabled=false;
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }


}
