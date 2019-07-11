import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { ParticipantsService } from '../../providers/participants.service';
import { ActivatedRoute}  from '@angular/router';
import{ urlContent } from '../../environments/environment';
import { AlertController, NavController, ToastController,MenuController } from '@ionic/angular';
import { VotoService } from '../../providers/voto.service';
import { LoadingController } from '@ionic/angular';

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
  public _validarEspecialista : boolean = false;
  public _idAsignarTipoUsuarioEncriptado : string ="";
  public _idAsignarCategoriaConfigurarEvento : string ="";
  public _estadoVotoGeneral : boolean = false;

  constructor(
    private storage: Storage,
    private participantService: ParticipantsService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private voteService : VotoService,
    private toastController:ToastController,
    private navCtrl : NavController,
    public menuCtrl: MenuController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.storage.get('idAsignarTipoUsuario').then(
      (valAsignarTipoUsuario) => 
      {
        this._idAsignarTipoUsuarioEncriptado = valAsignarTipoUsuario;
        this.storage.get('idAsignarCategoriaConfigurarEvento').then((valAsignarCategoriaConfigurarEvento) => 
        {
          this._idAsignarCategoriaConfigurarEvento = valAsignarCategoriaConfigurarEvento;
            this.cargarParticipantes();
        });
      }
    );

    this._codigoEvento = this.route.snapshot.paramMap.get('codigoEvento');
    this._urlContent =urlContent;
  }

  
  cargarParticipantes()
  {
      this.participantService.getParticipants(this._idAsignarTipoUsuarioEncriptado,this._idAsignarCategoriaConfigurarEvento).then(data => {
        this._validar=data['_validar'];
        this._mensaje = data['_mensaje'];
        if(data['_validar']==true)
        {
          this._participantes = data['_objeto'];
          this._validarEspecialista = data['_validarEspecialista'];
          this._estadoVotoGeneral = data['_estadoVotoGeneral'];
        }
      });
  }

  async mensajeVotoUnico(idConfigurarTipoActorEvaluadoEncriptado : string) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro que deseas votar?',
      message: '<strong>RECUERDA</strong> solo puedes votar por un stand en esta categoría!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {            
          }
        }, {
          text: 'Votar',
          handler: () => {
              this.votarVotoUnico(idConfigurarTipoActorEvaluadoEncriptado);           
              
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async votarVotoUnico(idConfigurarTipoActorEvaluadoEncriptado: string)
  {
    
      const loading = await this.loadingController.create({
        spinner: 'bubbles',
        message: 'Votando...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      loading.present();
 
    this.voteService.postSingleVote(this._idAsignarTipoUsuarioEncriptado,idConfigurarTipoActorEvaluadoEncriptado).then(data =>
      {        
        if(data['_validar']==false)
        {
          this.presentToast(data['_mensaje']);
        }
        else
        {
          //window.location.reload();
          this.cargarParticipantes();
          loading.dismiss();
        }
        this._validar = data['_validar'];
        this._mensaje=data['_mensaje'];   
      });
      loading.dismiss();

  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    toast.present();
  }


  cargarPaginaVotarVotoParametros(idConfigurarTipoActorEvaluadoEncriptado: string)
  {
    this.storage.set('idConfigurarTipoActorEvaluadoEncriptado', idConfigurarTipoActorEvaluadoEncriptado);            
    this.navCtrl.navigateForward(`parameters/${this._codigoEvento}`);
  }

}
