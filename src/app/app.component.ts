import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { SuggPage } from '../pages/sugg/sugg';
import { CompaniesPage } from '../pages/companies/companies';
import { CommunityPage } from '../pages/community/community';
import { PostsPage } from '../pages/posts/posts';
import { SettingsPage } from '../pages/settings/settings';
import { LogoutPage } from '../pages/logout/logout';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  
  pages: Array<{title: string, icon: string, component: any}>;
  pages2: Array<{title: string, icon: string, component: any}>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Página inicial', icon:'home', component: HomePage },
      { title: 'Sobre', icon:'information-circle', component: AboutPage },
      { title: 'Sugestões de redução', icon:'bulb', component: SuggPage },
      { title: 'Empresas parceiras', icon:'contacts', component: CompaniesPage },
      { title: 'Comunidade', icon:'people', component: CommunityPage }
      
    ];
    this.pages2 = [
      { title: 'Página inicial', icon:'home', component: HomePage },
      { title: 'Sobre', icon:'information-circle', component: AboutPage },
      { title: 'Sugestões de redução', icon:'bulb', component: SuggPage },
      { title: 'Empresas parceiras', icon:'contacts', component: CompaniesPage },
      { title: 'Comunidade', icon:'people', component: PostsPage },
      { title: 'Configurações', icon:'settings', component: SettingsPage },
      { title: 'Sair', icon:'power', component: LogoutPage }
      
    ];

  }

  initializeApp() 
  {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) 
  {
    this.nav.setRoot(page.component);
  }
  openPage2(page2) 
  {
    this.nav.setRoot(page2.component);
  }
}
