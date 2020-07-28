import { Component } from '@angular/core';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public _ser:WordService,public _router:Router) {}
    user_word:any;
    star:number=0;

    onclickStar(rating:number)
    {
      console.log(rating);
      this.star=rating;
      console.log(this.star);

      let new_rating=(this.user_word.w_rating*this.user_word.w_rating_count);
      new_rating=(new_rating+this.star)/(this.user_word.w_rating_count+1);
      this.user_word.w_rating_count+=1;
      this._ser.updateword(new word_class(this.user_word.u_id,this.user_word.w_name,new_rating,this.user_word.w_rating_count,this.user_word.w_id)).subscribe(
        (data:any)=>{
          console.log(data);
        window.location.href="http://localhost:8100/tabs/tab1"
        }
      )
    }

  ngOnInit() {
    setTimeout(()=>{
      let w_name=localStorage.getItem("w_name");
      this._ser.getUserByWords(w_name).subscribe(
        (data:any[])=>{
          console.log(data[0]);
          //this.word_list=data;
          this.user_word =data[0];
        }
      )
     
    },1000)
    
  }
  
  

}
