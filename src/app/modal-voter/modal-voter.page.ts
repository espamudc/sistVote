import { Component, OnInit } from '@angular/core';
import { IonicModule, NavParams, ModalController, NavController } from '@ionic/angular';
import { EventService } from '../../providers/event-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-voter',
  templateUrl: './modal-voter.page.html',
  styleUrls: ['./modal-voter.page.scss'],
})
export class ModalVoterPage implements OnInit {

  public _codigoEvento : string ="";
  public _validar: boolean = true;
  public _mensaje : string ="";

  constructor(
    private navparams: NavParams,
    private modalController:ModalController,
    public eventService:EventService,
    private storage: Storage,
    private navController: NavController
  ) { }

  ngOnInit() {
   
  }

  buscarEvento()
  {
    var _codigoEvento = this._codigoEvento;
    this.storage.get('idAsignarTipoUsuario').then((val) => 
    {
      this.eventService.getEvent(val, _codigoEvento).then(data => {
        this._validar=data['_validar'];
        this._mensaje = data['_mensaje'];
        if(data['_validar']==true)
        {
          this.enviarEvento(_codigoEvento);
        }
      });
    });    
  }

 
  enviarEvento(_codigoEvento)
  { 
    this.navController.navigateForward(`event/${_codigoEvento}`); 
    this.modalController.dismiss();
  }


}
