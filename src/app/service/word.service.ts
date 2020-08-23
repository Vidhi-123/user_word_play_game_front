import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private word_url:string="http://localhost:3000/word/";
  private word_user_url:string="http://localhost:3000/userword/";
  private url:string="https://api.dictionaryapi.dev/api/v2/entries/en/";
  private url1:string="http://localhost:3000/pattern/";
  private url2:string="http://localhost:3000/userword/"
  private max_id_url:string="http://localhost:3000/word_id/";
  private sort_url_rating:string="http://localhost:3000/sort/word_rating/";
  private sort_url_words:string="http://localhost:3000/sort/word_name/";
  private sort_url_words_desc:string="http://localhost:3000/sort/word_name_desc/";
  private sort_dateandtime:string="http://localhost:3000/sort/date_time/";

  constructor(private _http:HttpClient) { }

  getAllWord()
  {
    return this._http.get(this.word_url);
  }
  getUserByWords(w_id)
  {
    return this._http.get(this.word_url+w_id);
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

  checkword(word)
  {
    return this._http.get(this.url+word);
  }
  getWordsByPattern(w_name)
  {
    return this._http.get(this.url1+w_name);
  }
  adduserword1(item){
    console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url2,body,{headers:head1});
  }
  getMaxWordId()
  {
    return this._http.get(this.max_id_url);
  }
  getWordsByName()
  {
    return this._http.get(this.sort_url_words);
  }
  getWordsByNameDesc()
  {
    return this._http.get(this.sort_url_words_desc);

  }
  getWordsBydateTime()
  {
    return this._http.get(this.sort_dateandtime);
  }
  getWordsByRating()
  {
    return this._http.get(this.sort_url_rating);
  }
}
