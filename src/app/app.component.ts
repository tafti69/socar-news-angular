import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { Contact } from './Models/Contact';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form!:FormGroup;
  show = false;
  isLoading: boolean = false;
  success: boolean = false;
  errorMsg: boolean = false;

  constructor(private service: ServicesService) {  }

  ngOnInit(): void {
      
      this.form = new FormGroup({
        Name: new FormControl('', Validators.required),
        Workplace: new FormControl('', Validators.required),
        PhoneNumber: new FormControl('', Validators.required),
        CoauthorsSurname: new FormControl(''),
        Problem: new FormControl('', Validators.required),
        ProblemSolvingMethod: new FormControl('', Validators.required),
      })

      var lang = localStorage.getItem("lang");

      if(lang===null || lang === "AZE"){
        this.langButtons[1].isClicked=true;
        this.langButtons[0].isClicked=false;
        localStorage.setItem("lang", "AZE");
      }
      else {
        this.langButtons[0].isClicked=true;
        this.langButtons[1].isClicked=false;
        localStorage.setItem("lang", "KA");
      }
  }

  langButtons = [{text: 'KA', isClicked: true}, {text: 'AZ', isClicked: false}]

  setActive(button: any): void {
    for(let but of this.langButtons) {
      but.isClicked = false;
    }

    button.isClicked = true;
    if(this.langButtons[0].isClicked){
      localStorage.setItem("lang","KA");
      
    }
    else{
      localStorage.setItem("lang","AZE");
      
    }
    window.location.reload();
  }

  showDialog() {
    this.show = true;
  }

  onSubmit() {
    if(!this.form.valid) {
      this.errorMsg = true;
    }
    if(this.form.valid) {
      var obj = new Contact();
      var value = this.form.value;
      obj.name=value.Name;
      obj.coauthorsSurname = value.CoauthorsSurname;
      obj.phoneNumber = value.PhoneNumber;
      obj.problem = value.Problem;
      obj.workplace=value.Workplace;
      obj.problemSolvingMethod = value.ProblemSolvingMethod;
      this.isLoading = true;
      this.service.contactUs(obj).subscribe(res=> {
        console.log(res);
        this.isLoading = false;
        this.success = true;
        setTimeout(()=> {
          this.show = false;
          this.success = false;
          this.form.reset();
        }, 3000)
      });
    }

    
  }

  resetForm() {
    this.form.reset();
    this.errorMsg = false;
  }
 
}
