import { Component } from '@angular/core';
import { WordService } from '../service/word.service';
import { word_class } from '../classes/word_class';
import { UserService } from '../service/user.service';
import { user_class } from '../classes/user_class';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

first_word:string;
second_word:string;
name:string;
email_id:string;
myDate:Date;
x:string[]=[];
flag:boolean=false;
flag1:number=0;
users:user_class[]=[];
words:word_class[]=[];
sel:string;
is_adult:boolean;
zipcode:string;
cnt:number=0;
  constructor(private _ser:WordService,private _ser1:UserService) {}
  check_availablity()
  {



    if(this.sel=="adult")
    {
      this.is_adult=true;
    }
    else{
      this.is_adult=false;
    }

    let fw=this.first_word.trim();
    let sw=this.second_word.trim();
    for(let j=0;j<fw.length;j++)
    {
      if(fw[j]==' ')
      {
        this.cnt++;
      }
    }
    for(let p=0;p<sw.length;p++)
    {
      if(sw[p]==' ')
      {
        this.cnt++;
      }
    }
    setTimeout(()=>{
      if(this.cnt==0)
      {
        alert('It must be a space seperated words');
      }
      else{
        this._ser.getAllWord().subscribe(


          (data:word_class[])=>{
            console.log(data);
            this.words=data;
    
            for(let i=0;i<this.words.length;i++)
            {
              this.x=this.words[i].w_name.split("-");
              let first=this.x[0].trim().toLowerCase();
              let second=this.x[1].trim().toLowerCase();
              console.log(first);
              console.log(second);
              console.log(this.first_word);
              console.log(this.second_word);
    
             if(this.first_word.toLowerCase()==second && this.second_word.toLowerCase()==first)
             {
                  this.flag=false;
                  alert("Word is already there,Try different words");
                  break;
             }
             else if(this.first_word.toLowerCase()==first && this.second_word.toLowerCase()==second)
             {
              this.flag=false;
              alert("Word is already there,Try different words");
              break;
             }
             else
             {
              this.flag=true;
             }
             
            }
            
    
          }
    
        )
      }
    },3000)
    
  }



  add_word()
  {
    this._ser1.getUser().subscribe(
      (data:user_class[])=>{
        console.log(data);
        this.users=data;
        for(let i=0;i<this.users.length;i++)
        {
          if(this.users[i].email_id==this.email_id)
          {
            this.flag1=1;
            this._ser.addword(new word_class(this.users[i].u_id,this.first_word+" - "+this.second_word,0,0,this.is_adult)).subscribe(
              (data1:any)=>
              {
                console.log(data1);
              }
            );
          }
          if(i==this.users.length-1)
          {
            if(this.flag1==0)
            {
              let date=new Date(this.myDate);
              let year=date.getFullYear();
              console.log(year);
              this._ser1.adduser(new user_class(this.name,this.email_id,year,this.zipcode)).subscribe(
                (data2:any)=>
                {
                  console.log(data2);
                  this._ser.addword(new word_class(data2.insertId,this.first_word+" - "+this.second_word,0,0,this.is_adult)).subscribe(
                    (data3:any)=>
                    {
                      console.log(data3);
                    }
                  );
                }
              );
            }
          }
        }

      }
    )
  }
}
