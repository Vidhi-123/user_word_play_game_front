import { Component } from '@angular/core';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { user_class } from '../classes/user_class';
import { RatingService } from '../service/rating.service';
import { user_word_class } from '../classes/user_word_class';
import { rating_class } from '../classes/rating_class';


export class star_word{
  constructor(public word_id:number,public id:number,public date_time:Date,public is_adult:number,public name:string,public rating_avg:number,public rating_count:number,public user_id:number,public word_name:string,public star:number){}
}


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public _ser:WordService,public _ser2:RatingService,public _ser1:UserService,public _router:Router) {}
    user_word:any;
    star:number[]=[];
    user_word_details:star_word[]=[];
    user_id:number;
    rating_details:any;

    onclickStar(rating:number,item:user_word_class,i:number)
    {
      if(item.user_id==this.user_id)
      {
        alert("You cannot rate your own word");
      }
      else{
        if(this.star[i]==0)
        {
          console.log(rating);
        console.log(item);
        this.star[i]=rating;
        console.log(this.star[i]);
  
        this._ser2.deleteRatingByWordId(item.word_id).subscribe(
          (data:any)=>{
            console.log(data);
          }
        );
  
          this._ser2.addRating(new rating_class(this.user_id,item.word_id,this.star[i])).subscribe(
            (data:any)=>{
              console.log(data);
            }
          );
        }
        
      }
      
      
    }

    public ionViewWillEnter()
  {
    this.user_word_details=[];
    this.ngOnInit();
  }

  ngOnInit() 
  {

    this.user_word_details=[];
    this.user_id=Number(localStorage.getItem('user_id'));
console.log(this.user_id);
    if(this.user_id==0)
    {
      localStorage.setItem("url","tabs/tab3");
      this._router.navigate(['/home']);
    }
    else{
    
      let w_id=localStorage.getItem("word_id");
      console.log(w_id);
      this._ser.getUserByWords(w_id).subscribe(
        (data:star_word[])=>{
         console.log(data);
         
         for(let i=0;i<data.length;i++)
         {
           this._ser2.getStarByWordUserId(data[i].word_id,this.user_id).subscribe(
             (data1:any[])=>{
               console.log(data1);
               if(data1.length==0)
               {
                    //  this.star.push(0);
                    if(this.user_word_details.find(x=>x.word_id==data[i].word_id)==undefined)
                    {
                      this.user_word_details.push(new star_word(data[i].word_id,data[i].id,data[i].date_time,data[i].is_adult,data[i].name,data[i].rating_avg,data[i].rating_count,data[i].user_id,data[i].word_name,0));
                      console.log(this.user_word_details);
                    }
                      
                    
                    
               }
               else
               {
                console.log(data1[0].star);
              //  this.star.push(data1[0].star);
              if(this.user_word_details.find(x=>x.word_id==data[i].word_id)==undefined)
              {
                this.user_word_details.push(new star_word(data[i].word_id,data[i].id,data[i].date_time,data[i].is_adult,data[i].name,data[i].rating_avg,data[i].rating_count,data[i].user_id,data[i].word_name,data1[0].star));
                console.log(this.user_word_details);
              }
                
                    
              
               }
               
             }
           );
         }
        } 
      )
     
  }
  
  

}
}

