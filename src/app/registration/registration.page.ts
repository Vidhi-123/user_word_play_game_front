import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  name:string;
  email_id:string;
  user_name:string;
  date_of_birth:Date;
  password:string;
  cnfpassword:string;
  otp:number;


  constructor(private router:Router) { }

  ngOnInit() {
  }
  onRegister(){
    console.log(this.name,this.email_id,this.user_name,this.date_of_birth,this.password,this.cnfpassword,this.otp);
  }

}
