import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { RatingService } from '../service/rating.service';
import { rating_class } from '../classes/rating_class';
import { UserwordService } from '../service/userword.service';
import { user_word_class } from '../classes/user_word_class';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { user_type_class } from '../tab2/tab2.page';

@Component({
  selector: 'app-existing',
  templateUrl: './existing.page.html',
  styleUrls: ['./existing.page.scss'],
})
export class ExistingPage implements OnInit {
user_id:number=0;
words:word_class[]=[];
textobuscar='';
panelOpenState = false;
errormsg:string="";
word:string="";
f_flag:boolean[]=[];

d_flag:boolean=false;
emailFormControl = new FormControl('', [
  Validators.required,
  Validators.email,
]);


  constructor(private Router:Router,private ser2:UserwordService,private ser:WordService,private ser1:RatingService,private user_ser:UserService) { }


onexpand()
{
  this.word="";
  this.errormsg="";
  this.d_flag=false;
}


onClickCheck(x:number)
{
  console.log(x);  
  this.f_flag=[];
  console.log(this.word);
  this.word=this.word.trim();
  let f_word=this.word.split(' ');
  
  
  for(let i=0;i<f_word.length;i++)
  {
    this.f_flag.push(false);
    this.ser.checkword(f_word[i]).subscribe(
      ()=>{
        this.f_flag[i]=true;
      }
    );
    
  }

  setTimeout(() => {
    for(let i=0;i<this.f_flag.length;i++)
    {
      if(this.f_flag[i]==false)
      {
        //alert("No such word in dictionary");
        // document.getElementById('ferror').innerHTML="No such word in dictionary";
        this.errormsg="No such word in dictionary";
        this.d_flag=false;
        break;
      }
      if(i==this.f_flag.length-1)
      {
        // document.getElementById('ferror').innerHTML="";
        this.errormsg="";
        this.d_flag=true;
      }
    }

  }, 100);

}

  
  onClick(item)
  {
    console.log(item);
    console.log(this.word);
    this.ser.getWordsByPattern(this.word).subscribe(
      (data:any[])=>{
        if(data.length==1)
        {
          alert("already exists please try other word!");
        }
        else{
          this.ser.addword(new word_class(item.id,this.word,item.is_adult)).subscribe(
            (data:any)=>{
              console.log(data);
            
              this.ser.adduserword1(new user_word_class(this.user_id,data.insertId)).subscribe(
                (data2:any)=>{
                  console.log(data2);
                  this.ser.getCntAvgByWorduser(this.user_id).subscribe(
                    (avg_res:any[])=>{
                        console.log(avg_res[0]);
                        this.ser.getWordsByUserId(this.user_id).subscribe(
                          (word_cnt_res:any[])=>{
                            console.log(word_cnt_res[0]);
                            let user_type=Number(localStorage.getItem("user_type"));
                            console.log(user_type);
                            if(word_cnt_res[0].total_words>=20 && user_type==2 && avg_res[0].average_rating>=4)
                            {
                              alert("congo mithai bato good news hai!!");

                              this.user_ser.updateUser(new user_type_class(this.user_id,3)).subscribe(
                                (data4:any)=>{
                                  console.log(data4);
                                  localStorage.setItem("user_type",3+"");
                                }
                              );
                            }

                          }
                        )
                    }
                    
                  )
                }
              );

              this.ser1.addRating(new rating_class(0,data.insertId,0)).subscribe(
                (data1:any)=>{
                  console.log(data1);
                }
              )

              let user_type=Number(localStorage.getItem("user_type"));
              console.log(user_type);
              if(user_type==1)
              {

                this.user_ser.updateUser(new user_type_class(this.user_id,2)).subscribe(
                  (data4:any)=>{
                    console.log(data4);
                    localStorage.setItem("user_type",2+"");
                  }
                );
              }



              this.word="";
              this.errormsg="";
              this.d_flag=false;
            
            }
          )
        }
      }
    )
  }
  
  f1(event)
  {
    console.log(event);
    this.textobuscar=event.detail.value;
  }
  ngOnInit() {
    this.words=[];
    this.user_id=Number(localStorage.getItem("user_id"));
    if(this.user_id==0)
    {
      localStorage.setItem("url","existing");
      this.Router.navigate(['home']);
    }
    this.ser.getAllWord().subscribe(
      (data:word_class[])=>{
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
          console.log(data[i].word_name.search('-'));
          if(data[i].word_name.search('-')!=-1)
          {
            this.words.push(data[i]);
            
          }
        }
      }
      
    );
  }

}
