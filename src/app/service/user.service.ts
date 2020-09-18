import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user_login } from '../classes/user_login_class';
import { user_class } from '../classes/user_class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url:string="http://localhost:3000/user/";
private url2:string="http://localhost:3000/user/coin/"
private url1:string="http://localhost:3000/user/login/";
  constructor(private _http:HttpClient) { }

  getUser()
  {
    return this._http.get(this.url);
  }
  getUserById(u_id){
    return this._http.get(this.url+u_id);
  }
  updateUser(item:any)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url,body,{headers:head1});
  }
  getUserLogin(item:user_login)
  {
    console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url1,body,{headers:head1});
  }
  adduser(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
 
  }

  updateCoins(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url2,body,{headers:head1});
  }
}
