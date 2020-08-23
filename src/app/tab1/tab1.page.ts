import { Component } from '@angular/core';
import { IonSlides, AlertController, MenuController } from '@ionic/angular';
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
  choice:string;
  slider: IonSlides;
  stars:number=5;
  age:string;
  flag:boolean=true;
  slideshow:IonSlides;

  constructor(public _ser:WordService,private router:Router,private menu: MenuController,public popoverController: PopoverController) {}


  openFirst() {
    console.log("hey");
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  onsortselect()
  {
    console.log(this.choice);
    this.word_list1=[];
    if(this.choice=='asc')
    {
      this._ser.getWordsByName().subscribe(
        (data:word_class[])=>{
          console.log(data);
          if(this.age=='A')
        {
          for(let i=0;i<data.length;i++)
          {
            console.log(data[i].word_name.search('-'));
            if(data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        else
        {
          for(let i=0;i<data.length;i++)
          {
            if(data[i].is_adult==false && data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        }
      )
    }
    else if(this.choice=="desc")
    {
      this._ser.getWordsByNameDesc().subscribe(
        (data:word_class[])=>{
          console.log(data);
          if(this.age=='A')
        {
          for(let i=0;i<data.length;i++)
          {
            console.log(data[i].word_name.search('-'));
            if(data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        else
        {
          for(let i=0;i<data.length;i++)
          {
            if(data[i].is_adult==false && data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        }
      )
    }
    else if(this.choice=="d_t")
    {
      
      this._ser.getWordsBydateTime().subscribe(
        (data:word_class[])=>{
          console.log(data);
          if(this.age=='A')
        {
          for(let i=0;i<data.length;i++)
          {
            console.log(data[i].word_name.search('-'));
            if(data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        else
        {
          for(let i=0;i<data.length;i++)
          {
            if(data[i].is_adult==false && data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        }
      )
    }

    else if(this.choice=="r_t")
    {
      this._ser.getWordsByRating().subscribe(
        (data:word_class[])=>{
          console.log(data);
          if(this.age=='A')
        {
          for(let i=0;i<data.length;i++)
          {
            console.log(data[i].word_name.search('-'));
            if(data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        else
        {
          for(let i=0;i<data.length;i++)
          {
            if(data[i].is_adult==false && data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        }
      )
    }
    
      
  }

  navigated_fun(item:word_class)
  {
    localStorage.setItem('word_id',item.id.toString());
    this.router.navigate(['tabs/tab3']);

  }

  onLogOut()
  {
    console.log("clear");
    localStorage.clear();
    localStorage.removeItem("user_id");
    localStorage.removeItem("word_id");
    console.log(localStorage.getItem("user_id"));

  }
 
  ngOnInit() {
    this.word_list1=[];
   
    this.age=localStorage.getItem('age');

    this._ser.getAllWord().subscribe(
      (data:word_class[])=>{
        console.log(data);
        if(this.age=='A')
        {
          for(let i=0;i<data.length;i++)
          {
            console.log(data[i].word_name.search('-'));
            if(data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
        else
        {
          for(let i=0;i<data.length;i++)
          {
            if(data[i].is_adult==false && data[i].word_name.search('-')!=-1)
            {
              this.word_list1.push(data[i]);
            }
          }
        }
      }
    )
    
  }
  public ionViewWillLeave()
  {
    this.slider.stopAutoplay();
  }
  public ionViewWillEnter()
  {
    this.slider.startAutoplay();
    this.ngOnInit();
  }
  slidesDidLoad(mySlider: IonSlides)
  {
    this.slider = mySlider;
    mySlider.startAutoplay();
  }

}
