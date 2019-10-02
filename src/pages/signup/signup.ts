import { Component, ViewChild  } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MenuController } from 'ionic-angular';
import { PostsPage } from '../posts/posts';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage 
{
  public fname: string;
  public lname: string;
  public email: string;
  public password: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController,
    public menuCtrl: MenuController) { }
//validate
  Register(){
    if( !this.fname.trim() || this.fname == "")
    {
      let alert = this.alertCtrl.create({
      title:'Nome inválido',
      subTitle:'Primeiro nome está vazio',
      buttons: ['OK'] });
    alert.present();
    } 
    else if(!this.lname.trim() || this.lname=="")
    {
      let alert = this.alertCtrl.create({
      title:'Nome inválido',
      subTitle:'O sobrenome está vazio',
      buttons: ['OK'] });
      alert.present();
    }
    else if(!this.email.trim() || this.email=="")
    {
      let alert = this.alertCtrl.create({
      title:'email inválido',
      subTitle:'Email está vazio',
      buttons: ['OK'] });
      alert.present();
    } 
    else if(!this.password.trim() || this.password=="")
    {
      let alert = this.alertCtrl.create({
      title:'Senha inválida',
      subTitle:'A senha está vazia',
      buttons: ['OK'] });
      alert.present();
    }
    else if(this.password.length < 4)
    {
      let alert = this.alertCtrl.create({
      title:'Senha inválida',
      subTitle:'A senha deve ter mais de 4 caracteres',
      buttons: ['OK'] });
      alert.present();
    }
    else
    {
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password
    };
    
    let loader = this.loading.create({
      content: 'Por favor, espere…', });

    loader.present().then(() => {
    this.http.post('url',data, options)
    .map(res => res.json())
    .subscribe(res => {
    loader.dismiss()

    if(res[1] == "Registration successfull")
    {
      let alert = this.alertCtrl.create({
      title:"PARABÉNS",
      subTitle:"Registro bem sucedido",
      buttons: ['OK'] });
      alert.present();
      localStorage.setItem('currentUser', res[0]);
      this.menuCtrl.enable(false, 'menu1');
      this.menuCtrl.enable(true, 'menu2');
      this.navCtrl.setRoot(PostsPage);
    }else if(res=="User already Exist")
    {
      let alert = this.alertCtrl.create({
      title:"Desculpa",
      subTitle:"O utilizador já existe",
      buttons: ['OK'] });
      alert.present();
    }
    else
    {
      let alert = this.alertCtrl.create({
      title:'ERRO!',
      subTitle:(res),
      buttons: ['OK'] });
      alert.present();
    }
    });
    });
    }
  }
}












