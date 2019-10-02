import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController , AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  constructor(public navCtrl: NavController,public menuCtrl: MenuController,public alertCtrl: AlertController) { }

  ionViewDidLoad()
  {
    if ('currentUser' in localStorage){
      this.menuCtrl.enable(false, 'menu1');
      this.menuCtrl.enable(true, 'menu2');
    }else{
      this.menuCtrl.enable(true, 'menu1');
      this.menuCtrl.enable(false, 'menu2');
    }
  }
}
