import { Component, OnInit } from '@angular/core';
import { IonicModule, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-voter',
  templateUrl: './modal-voter.page.html',
  styleUrls: ['./modal-voter.page.scss'],
})
export class ModalVoterPage implements OnInit {

 public _codigoEvento : string ="";

  constructor(
    private navparams: NavParams,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    var _codigoEvento = this._codigoEvento;
  }

}
