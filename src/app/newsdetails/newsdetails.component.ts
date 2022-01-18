import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../Models/News';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html',
  styleUrls: ['./newsdetails.component.scss']
})
export class NewsdetailsComponent implements OnInit {

  news!: News;
  constructor(private router: ActivatedRoute, private service : ServicesService) { }

  data = " ";
  lang : any;
  ngOnInit(): void {
    this.lang = localStorage.getItem("lang");
    console.log(this.router.snapshot.params);
    this.data = this.router.snapshot.params.id;
    this.loadData()
    
  }
 loadData():void{

   this.service.getNewsById(this.data,this.lang).subscribe(x=>this.news=x);
 }
}
