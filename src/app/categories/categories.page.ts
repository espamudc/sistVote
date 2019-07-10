import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage} from '@ionic/storage';
import { NavController, MenuController } from '@ionic/angular';
import { CategoryService } from '../../providers/category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public _validar: boolean = true;
  public _mensaje : string ="";
  public _categorias : any [];
  public _codigoEvento : string;
  public _urlContent : string;



  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private categoryService: CategoryService,
    private navCtrl : NavController,
    public menuCtrl: MenuController,
  ) { }


  ngOnInit() {
    this.storage.get('idConfigurarEventoEncriptado').then(
      (valConfigurarEvento) => 
      {
        this.storage.get('idAsignarTipoUsuario').then((valAsignarTipoUsuario) => 
        {            
            this.mostrarCategorias(valAsignarTipoUsuario,valConfigurarEvento);
        });
      }
    );

    this._codigoEvento = this.route.snapshot.paramMap.get('codigoEvento');
  }

  mostrarCategorias(idAsignarTipoUsuarioEncriptado: string, idConfigurarEventoEncriptado: string)
  {
      this.categoryService.getCategories(idAsignarTipoUsuarioEncriptado,idConfigurarEventoEncriptado).then(data => {
        this._validar=data['_validar'];
        this._mensaje = data['_mensaje'];
        if(data['_validar']==true)
        {
          this._categorias = data['_objeto'];
        }
      });
  }

  cargarStandsPorCategoria(idAsignarCategoriaConfigurarEvento: string)
  {
    this.storage.set('idAsignarCategoriaConfigurarEvento', idAsignarCategoriaConfigurarEvento);
    this.navCtrl.navigateForward(`participants/${this._codigoEvento}`);
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
