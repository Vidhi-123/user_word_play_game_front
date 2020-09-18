import { Component } from '@angular/core';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { UserService } from '../service/user.service';
import { user_class } from '../classes/user_class';
import { Router } from '@angular/router';
import { RatingService } from '../service/rating.service';
import { rating_class } from '../classes/rating_class';
import { user_word_class } from '../classes/user_word_class';

export class user_type_class{
  constructor(public id:number,public type:number){}
  }

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})





export class Tab2Page {

first_word:string;
second_word:string;

x:string[]=[];
flag:boolean=false;
flag1:boolean=false;
flag3:boolean=false;
users:user_class[]=[];
words:word_class[]=[];
sel:string;
is_adult:boolean;
age:string;
w_flag:boolean=true;
cnt:number=0;
wflag:boolean;
user_id:number=0;
f_flag:boolean=false;
s_flag:boolean=false;
t_flag:boolean[]=[];
  constructor(private _ser:WordService,private _ser2:RatingService,private _ser1:UserService,private _router:Router) {}

  

  public ionViewWillEnter()
  {
    this.age=localStorage.getItem('age')
    console.log(this.age);
  }


  onAdd()
  {

    if(this.first_word==this.second_word)
    {
      alert("Both words can't be same!!");
    }
else{
    this.onCheckFirst();
    this.onCheckSecond();
    setTimeout(() => {
    
        if(this.flag==true || this.s_flag==true || this.flag1==true || this.f_flag==true)
        {

        }
        else{


          let f=this.first_word.trim();
          let s=this.second_word.trim();
          let first=f.split(" ");
          let second=s.split(" ");
  
          if(first.length==1 && second.length==1)
          {
            alert("One of the word must have space");
          }
          else{
            
          console.log(this.is_adult)
          this._ser.getMaxWordId().subscribe(
            (data:any[])=>{
              
              this._ser.addword(new word_class(data[0].max_id,this.first_word+" - "+this.second_word,this.is_adult)).subscribe(
                (data1:any)=>{

                  this._ser.adduserword1(new user_word_class(this.user_id,data1.insertId)).subscribe(
                    (data2:any)=>{
                      this._ser.getCntAvgByWorduser(this.user_id).subscribe(
                        (avg_res:any[])=>{
                            console.log(avg_res[0]);
                            this._ser.getWordsByUserId(this.user_id).subscribe(
                              (word_cnt_res:any[])=>{
                                console.log(word_cnt_res[0]);
                                let user_type=Number(localStorage.getItem("user_type"));
                                console.log(user_type);
                                if(word_cnt_res[0].total_words>=20 && user_type==2 && avg_res[0].average_rating>=4)
                                {
                                  alert("congo mithai bato good news hai!!");

                                  this._ser1.updateUser(new user_type_class(this.user_id,3)).subscribe(
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

                      console.log(data2);
                    }
                  );

                  this._ser2.addRating(new rating_class(0,data1.insertId,0)).subscribe(
                    (data3:any)=>{
                      console.log(data3);
                    }
                  )

                  let user_type=Number(localStorage.getItem("user_type"));
                  console.log(user_type);
                  if(user_type==1)
                  {

                    this._ser1.updateUser(new user_type_class(this.user_id,2)).subscribe(
                      (data4:any)=>{
                        console.log(data4);
                        localStorage.setItem("user_type",2+"");
                      }
                    );
                  }
                }
              )
            }
          )
        }
      }
    }, 2000);
    
  }
  }
  onCheckSecond()
  {
    this.s_flag=false;
    this.flag=false;
    document.getElementById("serror").innerHTML="";
    console.log(this.second_word);
    let second_arr=this.second_word.split(" ");
    for(let i=0;i<second_arr.length;i++)
    {
      this._ser.checkword(second_arr[i]).subscribe(
        (data:any[])=>{
          console.log(data);
        },
        (error:any)=>{
          console.log(error);
          // alert(this.second_word+" does not have any meaning . Please enter meaning full word ");
          document.getElementById("serror").innerHTML+=" Please enter meaning full word <br/>";
          this.flag=true;
        }
      )
      if(this.flag==false)
      {
        this._ser.getWordsByPattern(this.second_word).subscribe(
          (data:any[])=>{
            if(data.length>0)
            {
              // alert(this.second_word+" already exists");
              document.getElementById("serror").innerHTML+=" Word already exists <br/>"
              this.s_flag=true;
            }
           
          }
        )
      }
    }
  }

  ngOnInit()
  {
    this.user_id=Number(localStorage.getItem("user_id"));
    if(this.user_id==0)
    {
      localStorage.setItem("url","tabs/tab2");
      this._router.navigate(['home']);
    }
  }

  onCheckFirst()
  {
    this.flag1=false;
    this.f_flag=false;
    document.getElementById("ferror").innerHTML="";
    console.log(this.first_word);
    let first_arr=this.first_word.split(" ");
    for(let i=0;i<first_arr.length;i++)
    {
      this._ser.checkword(first_arr[i]).subscribe(
        (data:any[])=>{
          console.log(data);
        },
        (error:any)=>{
          console.log(error);
          // alert(this.first_word+" does not have any meaning . Please enter meaning full word ");
          document.getElementById("ferror").innerHTML+=" Please enter meaning full word <br/>";
          this.flag1=true;
        }
      )
      if(this.flag1==false)
      {
        this._ser.getWordsByPattern(this.first_word).subscribe(
          (data:any[])=>{
            if(data.length>0)
            {
              // alert(this.first_word+" already exists");
              document.getElementById("ferror").innerHTML+=" Word already exists <br/>";
              this.f_flag=true;
            }
           
          }
        )
      }
    }
  }

}