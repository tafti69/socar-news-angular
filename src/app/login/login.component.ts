import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import {SignInModel} from './SignInModel';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  form!: FormGroup;
  isDisabled = true;
  error = false;

  constructor(private service:ServicesService,  private router: Router) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin() {
    if(this.form.valid) {
      var model = new SignInModel();
      model.userName = this.form.value.username;
      model.password = this.form.value.password;
      
    this.service.signIn(model).subscribe(x => {      
      localStorage.setItem("userName", this.form.value.username);
      localStorage.setItem("password", this.form.value.password);
      localStorage.setItem("token", x.token);  
      this.router.navigate(['/admin']);
      }, 
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      });
    
      }
      else {
        this.error = true;
      }
    }

}
