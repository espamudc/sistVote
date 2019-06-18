import { Component, OnInit } from '@angular/core';
import { IonicModule, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage implements OnInit {
  tiposUsuario : any =[];
  constructor(    
    private navparams: NavParams,
    private modal:ModalController
    ) 
    { 


    }

    ngOnInit()
    {
      this.tiposUsuario = this.navparams.get('tipoUsuario');
      console.log(this.tiposUsuario);
    }


}
