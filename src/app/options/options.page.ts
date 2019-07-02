import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  _tiposUsuarios :any = [];
  constructor(
    private storage:Storage,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
    this.storage.get('idTiposUsuarios').then((val) => {
      this._tiposUsuarios = val;
    });
  }

  
  async cargarPaginaIngresarCodigoEvento(_idAsignarTipoUsuarioEncriptado : string)
  {      
      this.storage.set('idAsignarTipoUsuario', _idAsignarTipoUsuarioEncriptado);            
      this.navCtrl.navigateForward('/search-event');
  }

}
