import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.inSubmission = true;
    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password);
    }
    catch (e) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error occured.Please try again after sometime.';
      this.alertColor = 'red';
      console.log(e);
      return
    }
    this.alertMsg = 'Success!! you are logged in..';
    this.alertColor = 'green';
  }

}
