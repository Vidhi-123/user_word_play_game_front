import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url:string="http://localhost:3000/user/";
  constructor(private _http:HttpClient) { }

  getUser()
  {
    return this._http.get(this.url);
  }
  adduser(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }
}
