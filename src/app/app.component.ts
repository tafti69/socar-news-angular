import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form!:FormGroup;
  show = false;

  

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
    
    
  }
 
}
