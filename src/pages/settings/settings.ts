import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as $ from "jquery";


import { MypostsPage } from '../myposts/myposts';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage 
{
  data:string;

  firstName:string;
  lastName:string;

  constructor(public navCtrl: NavController,
    public events: Events,
    public toastCtrl: ToastController,
    public http: Http,
    public alertCtrl: AlertController,
    public loading: LoadingController) {
    this.getUser();
    }

  getUser()
  {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let data = {
    user_id: localStorage.getItem('currentUser')
  };
  let loader = this.loading.create({ content: 'Por favor, espere…', });
  loader.present().then(() => {
  this.http.post('https://baity.com.br/bhave/settings.php', data, options)
  .map(res => res.json())
  .subscribe(res => {
  loader.dismiss();

if(res == "Error"){
  let alert = this.alertCtrl.create({
    title:"ERRO!",
    subTitle:"",
    buttons: ['OK'] });
    alert.present();
}else{
this.firstName = res[0].user_fname;
this.lastName = res[0].user_lname;

}
});
});
  }
  ngAfterViewInit(){
    $("#saveBtn").hide();
    $("#fnameTxt").on("input", function() {
      $("#saveBtn").show();
  });
  $("#lnameTxt").on("input", function() {
    $("#saveBtn").show();
});

}

openMyPosts(){
  this.navCtrl.push(MypostsPage);
}

updateData(){

  // let regExp = new RegExp('^[A-Za-z0-9? ]+$');
if(!this.firstName.trim() || this.firstName == ""){
  let alert = this.alertCtrl.create({
    title: 'Nome inválido',
    subTitle: 'O primeiro nome não pode estar vazio',
    buttons: ['OK']
  });
  alert.present();
}else if (this.firstName.length < 2){
  let alert = this.alertCtrl.create({
    title: 'Nome inválido',
    subTitle: 'O primeiro nome não pode ter menos de dois caracteres',
    buttons: ['OK']
  });
  alert.present();
}else if(!this.lastName.trim() || this.lastName == ""){
  let alert = this.alertCtrl.create({
    title: 'Nome inválido',
    subTitle: 'O sobrenome não pode estar vazio',
    buttons: ['OK']
  });
  alert.present();
}else if(this.lastName.length < 2){
  let alert = this.alertCtrl.create({
    title: 'Nome inválido',
    subTitle: 'O sobrenome não pode ter menos de dois caracteres',
    buttons: ['OK']
  });
  alert.present();
}else{

  // console.log('YAYYYYYYYYY!');
}





}
}