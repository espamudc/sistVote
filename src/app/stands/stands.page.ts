import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { StandService} from '../../providers/stand-service.service';

@Component({
  selector: 'app-stands',
  templateUrl: './stands.page.html',
  styleUrls: ['./stands.page.scss'],
})
export class StandsPage implements OnInit {

  public _validar: boolean = true;
  public _mensaje : string ="";

  constructor(
    private storage: Storage,
    private standService: StandService
  ) { }

  ngOnInit() {
    this.storage.get('idConfigurarEventoEncriptado').then(
      (valConfigurarEvento) => 
      {
        this.storage.get('idAsignarTipoUsuario').then((valAsignarTipoUsuario) => 
        {
            this.cargarStands(valAsignarTipoUsuario,valConfigurarEvento);
        });
      }
    );


  }

  cargarStands(idAsignarTipoUsuarioEncriptado: string, idConfigurarEventoEncriptado: string)
  {
      this.standService.getStands(idAsignarTipoUsuarioEncriptado,idConfigurarEventoEncriptado).then(data => {
        this._validar=data['_validar'];
        this._mensaje = data['_mensaje'];
        if(data['_validar']==true)
        {
          console.log(data);
        }
      });
  }

}
