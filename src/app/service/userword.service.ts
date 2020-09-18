import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserwordService {
private url:string="http://localhost:3000/userword/"
private url1:string="http://localhost:3000/userword/rating/"
  constructor(private _http:HttpClient) { }

  adduserword1(item){
    console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }
  getWordIdRatingByUserId(user_id)
  {
    return this._http.get(this.url1+user_id);
  }

}
