import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-myposts',
  templateUrl: 'myposts.html'
})
export class MypostsPage 
{
  public items : any;
  constructor(public navCtrl: NavController,
    public events: Events,
    public toastCtrl: ToastController,
    public http: Http,
    public alertCtrl: AlertController,
    public loading: LoadingController) {
    this.getMyPosts();

    
    }
// delete post by _id
delPost(post_id){
//msg
  let alert = this.alertCtrl.create({
    title: 'Tem certeza de que deseja excluir esta postagem?',
    message: 'você não pode desfazer essa ação!',
    buttons: [
      {
        text: 'cancelar',
        handler: () => {
       

        }
      },
      {
        text: 'Ok',
        handler: () => {
          var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          let options = new RequestOptions({ headers: headers });
          let data = {
          id: post_id
        };
        let loader = this.loading.create({ content: 'Por favor, espere…', });
        loader.present().then(() => {
        this.http.post(url, data, options)
        .map(res => res.json())
        .subscribe(res => {
        loader.dismiss();
        //remove
        if(res == "removed"){
          this.getMyPosts();
        }else{
        
          let alert = this.alertCtrl.create({
            title:"ERRO!",
            subTitle:"",
            buttons: ['OK'] });//btn
            alert.present();
        }
        });
        });

        }
      }
    ]
  });
  alert.present();







}
// get user's posts
  getMyPosts()
  {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );//json
    let options = new RequestOptions({ headers: headers });
    let data = {
    user_id: localStorage.getItem('currentUser')
  };
  let loader = this.loading.create({ content: 'Por favor, espere…', });
  loader.present().then(() => {
  this.http.post(url, data, options)
  .map(res => res.json())
  .subscribe(res => {
  loader.dismiss();

if(res == "Error"){
  let alert = this.alertCtrl.create({
    title:"ERRO!",//error
    subTitle:"",// empty
    buttons: ['OK'] });//btn
    alert.present();
}else{

this.items = res;

}
});
});
  }
}
