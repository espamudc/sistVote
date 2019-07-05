import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { ParticipantsService } from '../../providers/participants.service';
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
    private participantService: ParticipantsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.storage.get('idAsignarTipoUsuario').then(
      (valAsignarTipoUsuario) => 
      {
        this.storage.get('idAsignarCategoriaConfigurarEvento').then((valAsignarCategoriaConfigurarEvento) => 
        {
            this.cargarParticipantes(valAsignarTipoUsuario,valAsignarCategoriaConfigurarEvento);
        });
      }
    );

    this._codigoEvento = this.route.snapshot.paramMap.get('codigoEvento');
    this._urlContent =urlContent;
  }

  
  cargarParticipantes(idAsignarTipoUsuarioEncriptado: string, idAsignarCategoriaConfigurarEventoEncriptado: string)
  {
      this.participantService.getParticipants(idAsignarTipoUsuarioEncriptado,idAsignarCategoriaConfigurarEventoEncriptado).then(data => {
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
