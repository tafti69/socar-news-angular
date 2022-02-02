import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { News } from '../Models/News';
import { NewsDTO } from '../Models/NewsDTO';
import { ServicesService } from '../services.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service: ServicesService) { }

  image: any = "";
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isLoading: boolean = false;
  extension:any;
  form!: FormGroup;
  lang:any
  news: News[] = [];
  buttonState: boolean = false;
  id:any;
  errorMsg: string = "";

  ngOnInit(): void {

    localStorage.getItem("token");

    this.form = new FormGroup({
      HeadingAZ: new FormControl('', Validators.required),
      HeadingGE: new FormControl('', Validators.required),
      ContentAZ: new FormControl('', Validators.required),
      ContentGE: new FormControl('', Validators.required),
      ImageURL: new FormControl('', Validators.required),
    })
    

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

  onHandleSubmit() {
    if(!this.form.valid) {
      this.errorMsg = "Fill in the forms.";
    }
    if(this.form.valid) {
      this.isLoading = true;
      var value = this.form.value;
      var obj = new NewsDTO();
      obj.azeDescription = value.ContentAZ;
      obj.azeTitle = value.HeadingAZ;
      obj.kaDescription = value.ContentGE;
      obj.kaTitle =value.HeadingGE;
      obj.image=this.image;
      obj.imageExtension=this.extension;
    
        if(this.buttonState){
        this.service.update(this.id,obj).subscribe(x=>{
          this.isLoading = false;
          window.location.reload();
        });
        }
        else{
          this.service.createNews(obj).subscribe(x=>{
            this.isLoading = false;
            window.location.reload();
          });
        }
    }
  }

  handleUpload(event: any) {
    this.imageChangedEvent = event;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var base64 = reader.result?.toString();
        if(base64!==null){
          this.image = base64?.split(',')[1];
          this.extension=`.${file.name.split('.')[1]}`;
         
        }
    };
  }
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    
  }

  imageLoaded(image: LoadedImage) {
    this.croppedImage = image;
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

  updateNews(item: any, i: any) {
    this.form = new FormGroup({
      HeadingAZ: new FormControl('', Validators.required),
      HeadingGE: new FormControl('', Validators.required),
      ContentAZ: new FormControl('', Validators.required),
      ContentGE: new FormControl('', Validators.required),
      ImageURL: new FormControl(''),
    })
    this.isLoading = true;
    this.service.getAdminNews(i).subscribe(x=>{
      this.form.patchValue({
        id: i,
        HeadingAZ: x.azeTitle,
        HeadingGE: x.kaTitle,
        ContentAZ: x.azeDescription,
        ContentGE: x.kaDescription,
    })
    
    this.id=i;
    this.buttonState = true;
    this.scrollTop();
    this.isLoading = false;
    });
    
  }

  scrollTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  refreshForm() {
    this.form.reset();
    this.buttonState = false;
    this.form = new FormGroup({
      HeadingAZ: new FormControl('', Validators.required),
      HeadingGE: new FormControl('', Validators.required),
      ContentAZ: new FormControl('', Validators.required),
      ContentGE: new FormControl('', Validators.required),
      ImageURL: new FormControl('', Validators.required),
    })
    this.croppedImage = '';
    this.image = '';
  }

  deleteNews(id: any) {
    console.log(id, "aa");
    console.log(localStorage.getItem('token'));
    
    this.service.deleteNews(id).subscribe(res => {
      window.location.reload();
    });
  }
}
