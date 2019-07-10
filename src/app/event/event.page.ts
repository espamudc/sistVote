import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage} from '@ionic/storage';
import { NavController,MenuController } from '@ionic/angular';
import { EventService } from '../../providers/event-service.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  public _objetoEvento : any [];
  public _objetoConfigurarActorEvaluador : any [];
  public _validar: boolean = true;
  public _mensaje: string ="";
  public _codigoEvento: string ="";

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private eventService: EventService,
    private navCtrl : NavController,
    public menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.mostrarEvento(this.route.snapshot.paramMap.get('codigoEvento')); 
  }

  mostrarEvento(_codigoEvento : string)
  {
      this.storage.get('idAsignarTipoUsuario').then((val) => 
      {
        this.eventService.getEvent(val, _codigoEvento)
        .then(data => {
          this._validar=data['_validar'];
          this._mensaje = data['_mensaje'];
          if(data['_validar']==true)
          {
            this._objetoEvento = data['_objeto'];
            this._objetoConfigurarActorEvaluador = data['_objeto'][0]._objetoConfigurarActorEvaluador;
          }
        });
      });  
      this._codigoEvento = _codigoEvento;
  }


  cargarCategoriasPorEvento(_idConfigurarEventoEncriptado : string)
  {
    this.storage.set('idConfigurarEventoEncriptado', _idConfigurarEventoEncriptado);
    this.navCtrl.navigateForward(`categories/${this._codigoEvento}`);
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}