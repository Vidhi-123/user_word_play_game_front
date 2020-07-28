import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private word_url:string="http://localhost:3000/word/";
  private word_user_url:string="http://localhost:3000/userword/";
  constructor(private _http:HttpClient) { }

  getAllWord()
  {
    return this._http.get(this.word_url);
  }
  getUserByWords(wname)
  {
    return this._http.get(this.word_user_url+wname);
  }
  updateword(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.word_url,body,{headers:head1});
  }
  addword(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.word_url,body,{headers:head1});
  }
}
