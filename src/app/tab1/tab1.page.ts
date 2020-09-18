import { Component, Inject } from '@angular/core';
import { IonSlides, AlertController, MenuController } from '@ionic/angular';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { PopoverController } from '@ionic/angular';
import { Tab3Page } from "../tab3/tab3.page";
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReportService } from '../service/report.service';
import { report_class } from '../classes/report_class';
import { UserwordService } from '../service/userword.service';
import { UserService } from '../service/user.service';
import { user_class } from '../classes/user_class';

export interface DialogData {
  item: word_class;
 
}
export class coinupdate{
  constructor(public user_id:number,
    public coins:number){

  }
 
}


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
  cnt3:number;
  cnt4:number;
  cnt5:number;
  flag:boolean=true;
  slideshow:IonSlides;
  coin:number=0;

  constructor(public _ser:WordService,private _ser3:UserService,public _ser2:UserwordService,public dialog:MatDialog,private router:Router,private menu: MenuController,public popoverController: PopoverController) {}


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
    this.slider.stopAutoplay();
    let user_type=Number(localStorage.getItem('user_type'));
    console.log(user_type);
    if(user_type==3)
    {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '90%',
        data: {item: item}
       
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.slider.startAutoplay();
        console.log('The dialog was closed');
      
      });
  }
    else{
    localStorage.setItem('word_id',item.id.toString());
    this.router.navigate(['tabs/tab3']);
    }
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
    this.cnt3=0;
    this.cnt4=0;
    this.cnt5=0;
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

    let user_id=Number(localStorage.getItem("user_id"));
    console.log(user_id);

    if(user_id!=0)
    {
      this._ser2.getWordIdRatingByUserId(user_id).subscribe(
        (data:any[])=>{
          for(let i=0;i<data.length;i++)
          {
          if(data[i].rating>=3 && data[i].rating<4)
          {
            this.cnt3++;
          }
          else if(data[i].rating>=4 && data[i].rating<5)
          {
            this.cnt4++;
          }
          else if(data[i].rating==5 )
          {
            this.cnt5++;
          }




          if(i==data.length-1){
            while(true)
            {
              if(this.cnt3>=25 && this.cnt4>=5 && this.cnt5>=1)
              {
                this.coin++;
                this.cnt3-=25;
                this.cnt4-=5;
                this.cnt5-=1;
              }
              else{
                this._ser3.updateCoins(new coinupdate(user_id,this.coin)).subscribe(
                  (data1:any[])=>{
                      console.log(data1);
                  }
                );
                break;
              }
            }
            
              
            }
          }
        
      }
      )
    }


    
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
  slideChanged(slides:IonSlides){
    this.slider=slides;
    console.log("slide changed.");
    this.slider.startAutoplay();
  }
  slidesDidLoad(mySlider: IonSlides)
  {
    this.slider = mySlider;
    mySlider.startAutoplay();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });
  }




}





@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <button mat-raised-button color="primary" (click)="onClickRate()" style="width:100px;">Rating</button> &nbsp;
  <button mat-raised-button color="primary" (click)="onClickReport()"  >Report for Abuse</button>
  `,
})


export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _ser:ReportService
   ) {}

  onClickRate(): void {
    console.log("on rate");
    localStorage.setItem('word_id',this.data.item.id.toString());
    this.router.navigate(['tabs/tab3']);
    console.log(this.data);
    this.dialogRef.close();
  }
onClickReport():void{
  console.log("on report");
  let user_id=Number(localStorage.getItem('user_id'));
  this._ser.addReport(new report_class(this.data.item.word_id,user_id,false)).subscribe(
    (data:any[])=>{
      console.log(data);
      alert("Reported Successfully");
      this.dialogRef.close();
    }
  )
}
}
