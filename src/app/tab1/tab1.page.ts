import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { PopoverController } from '@ionic/angular';
import { Tab3Page } from "../tab3/tab3.page";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  word_list:word_class[]=[];
  word_list1:word_class[]=[];
  slider: IonSlides;
  stars:number=5;
  age:number;
  flag:boolean=true;

  constructor(public _ser:WordService,private router:Router,public popoverController: PopoverController) {}

  // async presentPopover(item:word_class,ev: any) {
  //   console.log(item);
  //   localStorage.setItem("w_name",item.w_name);
  //   const popover = await this.popoverController.create({
  //     component: Tab3Page,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }


  onAgeCheck()
  {
    console.log(this.age);
    if(this.age>18)
    {
      this.word_list1=this.word_list;
      console.log(this.word_list1);
      this.flag=false;
    }
    else{
      for(let h=0;h<this.word_list.length;h++)
      {
        if(this.word_list[h].is_adult!=true)
        {
          this.word_list1.push(this.word_list[h]);
        }
        if(h==this.word_list.length-1)
        {
          this.flag=false;
          console.log(this.word_list1);
        }
      }
    }
    
  }


  navigated_fun(item:word_class)
  {
    localStorage.setItem("w_name",item.w_name);
    this.router.navigate(['tabs/tab3']);

  }
 
  ngOnInit() {
    this._ser.getAllWord().subscribe(
      (data:word_class[])=>{
        console.log(data);
        this.word_list=data;
      }
    )
    
  }
  slidesDidLoad(mySlider: IonSlides)
  {
    this.slider = mySlider;
    mySlider.startAutoplay();
  }

}
