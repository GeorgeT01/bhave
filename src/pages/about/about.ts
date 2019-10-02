import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage 
{
  constructor(public navCtrl: NavController,public events: Events, public toastCtrl: ToastController,private socialSharing: SocialSharing) 
  {
     var eventStar =  events.subscribe('star-rating:changed', (starRating) => {
       this.presentToast();
      });
  }

  presentToast() 
  {
    const toast = this.toastCtrl.create({
      message: 'Obrigado 🙂',
      duration: 1000,
      position: 'bottom' });
    toast.present();
  }

  share()
  {
    this.socialSharing.share("O aplicativo “B-Have” é um software de interface interativo cuja função é reduzir a distância entre aqueles que possuem interesse em reciclar e empresas do setor de comercialização de resíduos urbanos. Por meio de associações de funcionários que lidam com esses resíduos, disponibilizamos serviços que podem ir até sua casa e assim aumentar a capacidade de reciclagem de Belo Horizonte e seu entorno.", "B-Have", null, "http://bhave.tk/")
    .then(()=>{

    }).catch(()=>{

    });
  }
}