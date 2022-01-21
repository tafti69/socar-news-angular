import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInModel } from './login/SignInModel';
import { AuthToken } from './Models/AuthToken';
import { Contact } from './Models/Contact';
import { News } from './Models/News';
import { NewsDTO } from './Models/NewsDTO';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${localStorage.getItem('token')}` ,
      'Accept' : 'application/json'
    })
  };

  url : string;
  token : string = "";

  constructor(private httpClient:HttpClient) {    
    this.url = "https://socarapi.socarnews.site/api/";
    this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' ,
          'Authorization': `bearer ${localStorage.getItem('token')}` ,
          'Accept' : 'application/json'
        })
      };
  }

  signIn(model: SignInModel): Observable<AuthToken> {
    var signInUrl = this.url + "auth/signin";
    localStorage.setItem("expiration", (Date.now()+ 11*3600000).toString());
    return this.httpClient.post<AuthToken>(signInUrl,model);
  }


  refreshToken(){
    var model = new SignInModel();
    model.userName = localStorage.getItem("userName") ?? "";
    model.password = localStorage.getItem("password") ?? "";
    var signInUrl = this.url + "auth/signin";
    this.httpClient.post<AuthToken>(signInUrl,model).subscribe(x =>
      {
        localStorage.setItem("token", x.token);
        localStorage.setItem("expiration", (Date.now()+ 11*3600000).toString());
      }
    );
  } 

  getNews(id:string, type:string): Observable<News[]>{
    var newsUrl = this.url + `News/Get?Id=${id}&Type=${type}`;
    return this.httpClient.get<News[]>(newsUrl);
  }


  getAdminNews(id:any) : Observable<NewsDTO>{
    var adminNewsUrl = this.url + `news/GetAdminNewns/${id}`;   
    return this.httpClient.get<NewsDTO>(adminNewsUrl);
  }


  getNewsById(id:string, type:string): Observable<News>{
    var newsUrl = this.url + `News/Get?Id=${id}&Type=${type}`;
    return this.httpClient.get<News>(newsUrl);
  }


  createNews(dto:NewsDTO){
    this.refreshToken();
    var createUrl = this.url + "news/create";
    return this.httpClient.post(createUrl, dto);
  }


  update(id:any,dto:NewsDTO){
    this.refreshToken();
    var createUrl = this.url + `news/update/${id}`;
    return this.httpClient.put(createUrl, dto);
  }


  deleteNews(index: any) {
    this.refreshToken();
    var delUrl = this.url + `news/delete/${index}`;
    return this.httpClient.delete<any>(delUrl);
  }

  contactUs(obj:Contact){
    var contactUrl = this.url + 'news/sendemail';
    return this.httpClient.post(contactUrl,obj);
  }

}
