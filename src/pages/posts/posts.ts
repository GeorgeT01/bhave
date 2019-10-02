import { Component, Input } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Http, Headers, RequestOptions}  from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})

export class PostsPage 
{

  data:Observable<any>;
  public items : any;
  
  constructor(public navCtrl: NavController,public http: HttpClient,public alertCtrl: AlertController,
    private http2: Http,
    public loading: LoadingController) 
  {
    this.showData();
  }
// load data
  showData()
  {
    this.data = this.http.get('url');
    this.data.subscribe(data =>{
      this.items = data; 
    });
  }

// refresher 
  doRefresh(refresher) 
  {
    this.data.subscribe(data =>{
      this.items = data;
    refresher.complete(); 
    });
  }
// open form to insert new post
  openForm()
  {
 
    const prompt = this.alertCtrl.create({
      title: '',
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Escreva aqui ...'
        },
      ],
      cssClass:'prompt_alert',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Postar',
          handler: data => {
            if(data.title == "")
            {
              this.presentAlert();
              return false;
            }
            else
            {
              var headers = new Headers();
              headers.append('Accept', 'application/json');
              headers.append('Content-Type', 'application/json');
              let options = new RequestOptions({ headers: headers });
              let dataInfo = {
                txtInput: data.title,
                userId: localStorage.getItem('currentUser')
              };
              
              let loader = this.loading.create({
                content: 'Por favor, espere…', });
          // show alert dialog
              loader.present().then(() => {
              this.http2.post('url',dataInfo, options)
              .map(res => res.json())
              .subscribe(res => {
              loader.dismiss()
              if(res=="inserted successfull"){
                
                this.showData();
              }else{
                let alert = this.alertCtrl.create({
                  title:"Erro",
                  subTitle:"Por favor, tente novamente mais tarde",
                  buttons: ['OK'] });
                  alert.present();
              }
           
              });
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'A entrada está vazia',
      buttons: ['OK']
    });
    alert.present();
  }
}




