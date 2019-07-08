import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { ActivatedRoute}  from '@angular/router';
import { ParticipantsService } from '../../providers/participants.service'

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})
export class ParametersPage implements OnInit {

  public _codigoEvento : string ="";    
  public _validar: boolean = true;
  public _mensaje : string ="";
  public _parametros : any [];
  public _numerosCalificacion = new Array();

  public _voto : number= 0 ;


  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    private participantService: ParticipantsService
  ) { }

  ngOnInit() {
    this._codigoEvento = this.route.snapshot.paramMap.get('codigoEvento');

    this.storage.get('idAsignarTipoUsuario').then(
      (valAsignarTipoUsuario) => 
      {
        this.storage.get('idConfigurarTipoActorEvaluadoEncriptado').then((valConfigurarTipoActorEvaluadoEncriptado) => 
        {
            this.cargarParametros(valAsignarTipoUsuario,valConfigurarTipoActorEvaluadoEncriptado);
        });
      }
    );
  }

  cargarParametros(idAsignarTipoUsuarioEncriptado: string, idConfigurarTipoActorEvaluadoEncriptado: string)
  {
      this.participantService.getParametersForParticipants(idAsignarTipoUsuarioEncriptado,idConfigurarTipoActorEvaluadoEncriptado).then(data => {
        this._validar=data['_validar'];
        this._mensaje = data['_mensaje'];
        if(data['_validar']==true)
        {
          this._parametros = data['_objeto'];
          this._parametros.forEach(element => {
            var _valorMinimo : number = element['_rangoMinimo'];
            var _valorMaximo: number = element['_rangoMaximo'];
            for(var i=_valorMinimo; i<=_valorMaximo; i++)
              {
                if(i==0)
                {
                  this._numerosCalificacion[i] = [i,'Insuficiente'];
                }else if(i==1)
                {
                  this._numerosCalificacion[i] = [i,'Malo'];
                }else if(i==2)
                {
                  this._numerosCalificacion[i] = [i,'Bueno'];
                }else
                {
                  this._numerosCalificacion[i] = [i,'Excelente'];
                }
              }
          });
        }
      });
  }

  votoPorParametro(idConfigurarTipoActorEvaluadoEncriptado: string, idAsignarParametrosCategoriaEncriptado: string)
  {
    console.log(this._voto);
    console.log(idConfigurarTipoActorEvaluadoEncriptado,idAsignarParametrosCategoriaEncriptado)
  }

  


}
