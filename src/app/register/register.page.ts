import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../providers/person.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  tiposIdentificacion:string;
  tiposexo:string;
  constructor(public personService:PersonService ) { }

  ngOnInit() {
    this.getTypeIden();
  }

  getTypeIden(){

   this.personService.getTypeIdentification().then(data=>{
     this.tiposIdentificacion=data['_objetoTipoIdentificacion'];
     this.tiposexo=data['_objetoSexo'];
   }).catch(error=>{

   })

  }




}
