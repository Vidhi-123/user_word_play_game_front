import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {  
  navigate: any; 
  user_id:number=0 
  constructor(   
    private platform: Platform,  
    private splashScreen: SplashScreen,  
    private statusBar: StatusBar ,
    private router:Router,
    public menuCtrl: MenuController 
  ) {   
   
    this.initializeApp();  
  }  
  initializeApp() {  
    this.platform.ready().then(() => {  
      this.statusBar.styleDefault();   
      this.splashScreen.hide();  
    });  
  }  
  ngOnInit()
  {
    this.user_id=Number(localStorage.getItem("user_id"));
  }
  logoutClicked()
  {
    this.menuCtrl.close();
    this.user_id=0;
    localStorage.clear();
  }
  loginClicked()
  {
    this.menuCtrl.close();
    localStorage.setItem("url","tabs/tab1");
    
    this.router.navigate(['home']);

  }
  closeMenu() {
    this.menuCtrl.close();
  }
  onClickExisting()
  {
    this.menuCtrl.close();
    this.router.navigate(['existing']);
  }
  onClickNew()
  {
    this.menuCtrl.close();
    this.router.navigate(['tabs/tab2']);
  }
  onClickHome()
  {
    this.menuCtrl.close();
    this.router.navigate(['tabs/tab1']);
  }
}   