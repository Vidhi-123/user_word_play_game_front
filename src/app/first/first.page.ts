import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  flag:number=0;
  flag1:boolean=true;
  ch_flag:boolean=false;
  age:string;
  constructor(public alertController: AlertController,public _router:Router) { }



  onclickchk()
  {
   this.ch_flag=!this.ch_flag;
   if(this.ch_flag && this.age=='A')
   {
     this.flag1=false;
   }
   else
   {
     this.flag1=true
   }
  }

  onClickConfirm()
  {
    localStorage.setItem("age",this.age);
    this._router.navigate(['tabs/tab1']);
  }


  onselectradio(type)
  {
    console.log(type.detail.value);
     this.age=type.detail.value;

    if(this.age=='A')
    {
      this.flag=1;
      this.flag1=true;
    }
    else
    {
      this.flag=0;
      this.flag1=false;
    }
  }

 





  ngOnInit() {
   
 
    

  }

}
