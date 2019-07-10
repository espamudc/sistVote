import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { ActivatedRoute}  from '@angular/router';
import { ParticipantsService } from '../../providers/participants.service';
import { VotoService } from '../../providers/voto.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})


export class ParametersPage implements OnInit {



  public _codigoEvento : string ="";    
  public _validar: boolean = true;
  public _idAsignarTipoUsuario : string;
  public _mensaje : string ="";
  public _parametros : any [];
  public _parametrosDetalles = new Array();
  public valorVoto:any;
  public idParametro:any;
  public idActorEvaluado:any;
  public contador:number=0;
  public colorCheck : any= ["danger","warning","primary","success"];
  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    private participantService: ParticipantsService,
    private votoService: VotoService,
    private toastController : ToastController
  ) { }

  ngOnInit() {
    this._codigoEvento = this.route.snapshot.paramMap.get('codigoEvento');
    this.cargarParametros();
  }

  cargarParametros()
  {
    this.storage.get('idAsignarTipoUsuario').then(
      (valAsignarTipoUsuario) => 
      {
        this._idAsignarTipoUsuario = valAsignarTipoUsuario;
        this.storage.get('idConfigurarTipoActorEvaluadoEncriptado').then((valConfigurarTipoActorEvaluadoEncriptado) => 
        {
          this.participantService.getParametersForParticipants(valAsignarTipoUsuario,valConfigurarTipoActorEvaluadoEncriptado).then(data => {
            this._validar=data['_validar'];
            this._mensaje = data['_mensaje'];
            if(data['_validar']==true)
            {
              this._parametros = data['_objeto'];      
              this.definirParametros();
            }
          });
        });
      }
    );     
  }

  definirParametros()
  {    
    
    var _index : number =0;
    this._parametros.forEach(element => {
        var _valorMinimo : number = element['_rangoMinimo'];
        var _valorMaximo: number = element['_rangoMaximo'];
        var _detalle = new Array();
        
        for(var i=_valorMinimo; i<=_valorMaximo; i++)
          {
            if(i==0)
            {
              _detalle[i] = [element['_idAsignarParametrosCategoriaEncriptado'],i,'Insuficiente',];
            }else if(i==1)
            {
              _detalle[i] = [element['_idAsignarParametrosCategoriaEncriptado'],i,'Malo'];
            }else if(i==2)
            {
              _detalle[i] = [element['_idAsignarParametrosCategoriaEncriptado'],i,'Bueno'];
            }else
            {
              _detalle[i] = [element['_idAsignarParametrosCategoriaEncriptado'],i,'Excelente'];
            }
          }
        this._parametrosDetalles[_index] = _detalle;
        _index++;
    });
  }

  validar(idAsignarParametrosCategoriaEncriptado : string)
  {
    var _array = new Array();
    var _numero : number = 0;
    this._parametrosDetalles.forEach(elementGeneral => {
      elementGeneral.forEach(element => {
        if(element[0]==idAsignarParametrosCategoriaEncriptado)
        {
          _array[_numero] = element;
          _numero++;
        }
      });
    });
    return _array;
  }

  votoPorParametro()
  {    
    this.votoService.postParameterizedVote(this._idAsignarTipoUsuario,this.idActorEvaluado,this.idParametro,this.valorVoto)
    .then(data =>
      {
        
        this._validar = data['_validar'];
        this._mensaje=data['_mensaje'];   
       if(data['_validar']==false)
       {
        this.presentToast(this._mensaje);
       }else
       {
        window.location.reload();
       }
      });
     
  }

  guardarValor(valorVoto:any, idParametro:any,idActorEvaluado:any){
    this.valorVoto=valorVoto;
    this.idParametro=idParametro;
    this.idActorEvaluado=idActorEvaluado;
  }


    
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }

  aumentarContador()
  {
    this.contador++;
  }
 
}
