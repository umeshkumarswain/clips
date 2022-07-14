import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email])
  age = new FormControl('', [Validators.required, Validators.min(18), Validators.max(120)])
  password = new FormControl('', [Validators.required, Validators.min(8), Validators.max(20)])
  confirm_password = new FormControl('', [Validators.required,])
  phoneNumber = new FormControl('', [Validators.required, Validators.min(13), Validators.max(13)])


  showAlert: boolean = false;
  alertMsg: string = "Please wait! Your account is being created.";
  alertColor: string = 'blue';


  registerForm = new FormGroup({
    name: this.name, email: this.email, age: this.age, password: this.password, confirm_password: this.confirm_password, phoneNumber: this.phoneNumber
  });

  register() {
    this.showAlert = true;
    this.alertMsg = "Please wait! Your account is being created.";
    this.alertColor = 'blue';
  }
}