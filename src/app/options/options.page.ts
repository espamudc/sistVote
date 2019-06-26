import { Component, OnInit } from '@angular/core';
import { ModalVoterPage} from '../modal-voter/modal-voter.page';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  _tiposUsuarios :any = [];
  constructor(
    private storage:Storage,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.storage.get('idTiposUsuarios').then((val) => {
      this._tiposUsuarios = val;
    });
  }

  
  async cargarModalIngresarCodigoEvento (_idAsignarTipoUsuarioEncriptado : string)
  {      
      this.storage.set('idAsignarTipoUsuario', _idAsignarTipoUsuarioEncriptado);            
      const modal = await this.modalController.create({
        component: ModalVoterPage
      });
      return await modal.present();
  }

}
