import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserwordService {
private url:"http://localhost:3000/userword/"
  constructor(private _http:HttpClient) { }

  adduserword1(item){
    console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }
}
