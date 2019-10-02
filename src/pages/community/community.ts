import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { PostsPage } from '../posts/posts';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})
export class CommunityPage 
{
 public rootPage: any = PostsPage;
  @ViewChild("email") email;
  @ViewChild("password") password;
  data:string;
  userData:any;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController,
    public menuCtrl: MenuController,
    private storage: Storage,
    private fb: Facebook) {
  
  }


  openSignup(){
    this.navCtrl.push(SignupPage);
  }

  login(){
    if(this.email.value=="" ){
      let alert = this.alertCtrl.create({
      title:"ATENÇÃO",
      subTitle:"Email está vazio",
      buttons: ['OK'] });
      alert.present();
    } 
    else if(this.password.value=="")
    {
      let alert = this.alertCtrl.create({
      title:"ATENÇÃO",
      subTitle:"A senha está vazia",
      buttons: ['OK'] });
      alert.present();
    }
    else
    {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      let data = {
      email: this.email.value,
      password: this.password.value
    }
    let loader = this.loading.create({ content: 'Por favor, espere…', });
    loader.present().then(() => {
    this.http.post('https://baity.com.br/bhave/login.php',data,options)
    .map(res => res.json())
    .subscribe(res => {
    loader.dismiss()
    if(res[0] == "logged in")
    {
      let alert = this.alertCtrl.create({
      title:"Seu sucesso no Login",  
      subTitle:" ",
      buttons: ['OK'] 
    });
      alert.present();
     localStorage.setItem('currentUser', res.user_id);
      if ('currentUser' in localStorage){
        this.menuCtrl.enable(false, 'menu1');
        this.menuCtrl.enable(true, 'menu2');
        this.navCtrl.setRoot(PostsPage);
      }else{
        let alert = this.alertCtrl.create({
          title:"ERRO!",
          subTitle:"",
          buttons: ['OK'] });
          alert.present();
      }
    }else{
      let alert = this.alertCtrl.create({
      title:"ERRO",
      subTitle:"Eu e-mail ou senha de login é inválido",
      buttons: ['OK'] });
      alert.present();
    }
    });
    });
    }
    }


    loginViaFacebook(){
      this.fb.login(['email','public_profile']).then((res: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,email,first_name,last_name',[]).then(profile=>{
          this.userData = {fb_email:profile['email'], fb_first_name: profile['first_name'], fb_last_name:profile['last_name']}
        })
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        let data = {
          fname: this.userData.fb_first_name,
          lname: this.userData.fb_last_name,
          email: this.userData.fb_email,
          password: 'e!h@a#b$a!l@r#o$m%h^e7n*'
        };
        
        let loader = this.loading.create({
          content: 'Por favor, espere…', });
    
        loader.present().then(() => {
        this.http.post('https://baity.com.br/bhave/signup.php',data, options)
        .map(res => res.json())
        .subscribe(res => {
        loader.dismiss()
    
        if(res[1] == "Registration successfull")
        {
          let alert = this.alertCtrl.create({
          title:"PARABÉNS",
          subTitle:"Seu sucesso no Login",
          buttons: ['OK'] });
          alert.present();
          localStorage.setItem('currentUser', res[0]);
          this.menuCtrl.enable(false, 'menu1');
          this.menuCtrl.enable(true, 'menu2');
          this.navCtrl.setRoot(PostsPage);
        }else if(res=="User already Exist")
        {
          var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          let options = new RequestOptions({ headers: headers });
          let data = {
            email: this.userData.fb_email,
            password: 'e!h@a#b$a!l@r#o$m%h^e7n*'
        };
        let loader = this.loading.create({ content: 'Por favor, espere…', });
        loader.present().then(() => {
        this.http.post('https://baity.com.br/bhave/login.php',data,options)
        .map(res => res.json())
        .subscribe(res => {
        loader.dismiss()
        if(res[0] == "logged in")
        {
          let alert = this.alertCtrl.create({
          title:"Seu sucesso no Login",  
          subTitle:" ",
          buttons: ['OK'] 
        });
          alert.present();
         localStorage.setItem('currentUser', res.user_id);
          if ('currentUser' in localStorage){
            this.menuCtrl.enable(false, 'menu1');
            this.menuCtrl.enable(true, 'menu2');
            this.navCtrl.setRoot(PostsPage);
          }else{
            let alert = this.alertCtrl.create({
              title:"ERRO!",
              subTitle:"",
              buttons: ['OK'] });
              alert.present();
          }
        }else{
          let alert = this.alertCtrl.create({
          title:"ERRO",
          subTitle:"Eu e-mail ou senha de login é inválido",
          buttons: ['OK'] });
          alert.present();
        }
        });
        });
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
  })
  .catch(e => {
    let alert = this.alertCtrl.create({
      title: 'ERRO login com facebook! ',
      subTitle: 'por favor, tente novamente.',
      buttons: ['OK']
    });
    alert.present();

  });

    }
}







