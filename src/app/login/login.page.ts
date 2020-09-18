import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { user_login } from '../classes/user_login_class';
import { user_class } from '../classes/user_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email_id:string;
    password:string;
    b_date:Date;
    c_date:Date=new Date();

  constructor(private _ser:UserService,private Route:Router) { }

  ngOnInit() {
  }
  onSignIn(){
    console.log(this.email_id,this.password);
      this._ser.getUserLogin(new user_login(this.email_id,this.password)).subscribe(
        (data:user_class[])=>{
          console.log(data);
          localStorage.setItem("user_id",data[0].user_id.toString());
          localStorage.setItem("user_type",data[0].type.toString());

          this.b_date=new Date(data[0].date_of_birth);
          if(this.c_date.getFullYear()-this.b_date.getFullYear()>=18)
          {
            localStorage.setItem("age","A");
          }
          else{
            localStorage.setItem("age","UA");
          }
          //this.Route.navigate(['tabs/tab3']);
          let url=localStorage.getItem("url");
          window.location.href="http://localhost:8100/"+url;
          
        }
      )
  }


}
