import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { rating_class } from '../classes/rating_class';

@Injectable({
  providedIn: 'root'
})
export class RatingService {


  private rating:string="http://localhost:3000/rating/";
  private rating1:string="http://localhost:3000/rating/getstar/";
  constructor(private _http:HttpClient) { }
  getRatingCountAvg(w_id){
return this._http.get(this.rating+w_id);
  }

  addRating(item:rating_class)
  {
    console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.rating,body,{headers:head1});
  }

  deleteRatingByWordId(w_id){
    return this._http.delete(this.rating+w_id);
  }

  getStarByWordUserId(word_id,user_id)
  {
    return this._http.get(this.rating1+word_id+'/'+user_id);
  }
}
