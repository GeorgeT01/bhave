import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { SuggPage } from '../pages/sugg/sugg';
import { CompaniesPage } from '../pages/companies/companies';
import { CommunityPage } from '../pages/community/community';
import { SignupPage } from '../pages/signup/signup';
import { PostsPage } from '../pages/posts/posts';
import { SettingsPage } from '../pages/settings/settings';
import { LogoutPage } from '../pages/logout/logout';
import { MypostsPage } from '../pages/myposts/myposts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StarRatingModule } from 'ionic3-star-rating';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    SuggPage,
    CompaniesPage,
    CommunityPage,
    SignupPage,
    PostsPage,
    SettingsPage,
    LogoutPage,
    MypostsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StarRatingModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    SuggPage,
    CompaniesPage,
    CommunityPage,
    SignupPage,
    PostsPage,
    SettingsPage,
    LogoutPage,
    MypostsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
  
  ]
})
export class AppModule {}
