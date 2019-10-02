import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MenuController } from 'ionic-angular';


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage 
{
  constructor(public navCtrl: NavController,
    public events: Events, 
    public toastCtrl: ToastController,
    public loading: LoadingController,
    public menuCtrl: MenuController) { }

    ionViewDidLoad()
    {
      localStorage.removeItem('currentUser');
      let loader = this.loading.create({
        content: 'Sair...', });
        loader.present().then(() => {
          loader.dismiss()
          this.menuCtrl.enable(true, 'menu1');
          this.menuCtrl.enable(false, 'menu2');
          this.navCtrl.setRoot(HomePage);
        });
    }

}