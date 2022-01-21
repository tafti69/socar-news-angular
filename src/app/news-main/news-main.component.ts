import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../Models/News';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-news-main',
  templateUrl: './news-main.component.html',
  styleUrls: ['./news-main.component.scss']
})
export class NewsMainComponent implements OnInit {

  lang:any
  isLoading: boolean = false;
  news: News[] = [];
  constructor(private service:ServicesService) { 
  }
  

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang");
    if(this.lang === null){
      localStorage.setItem("lang", "AZE");
    }
    this.loadData();
  }


  loadData():void{
    this.isLoading = true; 
    this.service.getNews("all", this.lang).subscribe(res=> 
      {
       this.news=res;
       this.isLoading = false;
      });
  }
}
