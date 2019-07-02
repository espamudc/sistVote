import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { StandService} from '../../providers/stand-service.service';
import { ActivatedRoute}  from '@angular/router'
import{ urlContent } from '../../environments/environment';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {
  
  public _validar: boolean = true;
  public _mensaje : string ="";
  public _participantes : any [];
  public _codigoEvento : string;
  public _urlContent : string;

  constructor(
    private storage: Storage,
    private standService: StandService,
    private route: ActivatedRoute
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

    this._codigoEvento = this.route.snapshot.paramMap.get('codigoEvento');
    this._urlContent =urlContent;
  }

  
  cargarStands(idAsignarTipoUsuarioEncriptado: string, idConfigurarEventoEncriptado: string)
  {
      this.standService.getStands(idAsignarTipoUsuarioEncriptado,idConfigurarEventoEncriptado).then(data => {
        this._validar=data['_validar'];
        this._mensaje = data['_mensaje'];
        if(data['_validar']==true)
        {
          this._participantes = data['_objeto'];
          console.log(data);
        }
      });
  }

}
