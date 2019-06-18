import { Component, OnInit } from '@angular/core';
import { IonicModule, NavParams, ModalController } from '@ionic/angular';
import { ModalVoterPage } from '../modal-voter/modal-voter.page';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})


export class ModalLoginPage implements OnInit {
  tiposUsuario : any =[];
  constructor(    
    private navparams: NavParams,
    private modalController:ModalController
    ) 
    { 


    }

    ngOnInit()
    {
      this.tiposUsuario = this.navparams.get('tipoUsuario');
    }

    async cargarModalIngresoVotos ()
    {
        
        const modal = await this.modalController.create({
          component: ModalVoterPage
        });
        return await modal.present();
    }


}
