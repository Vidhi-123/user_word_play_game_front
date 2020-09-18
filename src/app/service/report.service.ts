import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private report_url:string="http://localhost:3000/report";
  constructor(private _http:HttpClient) { }
  addReport(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.report_url,body,{headers:head1});

  }
}
