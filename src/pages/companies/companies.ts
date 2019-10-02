import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html'
})
export class CompaniesPage 
{
  data:Observable<any>;
  public items : any;
  constructor(public navCtrl: NavController,public http: HttpClient) { 

    this.showData();
  }
  showData()
  {
    this.data = this.http.get('https://baity.com.br/bhave/company.php');
    this.data.subscribe(data =>{
      this.items = data; 
    });
  }

  // Added in V2
  doRefresh(refresher) 
  {
    this.data.subscribe(data =>{
      this.items = data;
    refresher.complete(); 
    });
  }
}
