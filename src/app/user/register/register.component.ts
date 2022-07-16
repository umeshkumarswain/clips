import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  email = new FormControl('', [Validators.required, Validators.email], [this.emailTaken.validate])
  age = new FormControl<number | null>(null, [Validators.required, Validators.min(18), Validators.max(120)])
  password = new FormControl('', [Validators.required, Validators.min(8), Validators.max(20)])
  confirm_password = new FormControl('', [Validators.required,])
  phoneNumber = new FormControl('', [Validators.required, Validators.min(13), Validators.max(13)])


  showAlert: boolean = false;
  alertMsg: string = "Please wait! Your account is being created.";
  alertColor: string = 'blue';
  inSubmission: boolean = false;


  constructor(public authService: AuthService, private emailTaken: EmailTaken) { }

  registerForm = new FormGroup({
    name: this.name, email: this.email, age: this.age, password: this.password, confirm_password: this.confirm_password, phoneNumber: this.phoneNumber
  }, [RegisterValidators.match("password", "confirm_password")]);

  async register() {
    this.showAlert = true;
    this.alertMsg = "Please wait! Your account is being created.";
    this.alertColor = 'blue';
    this.inSubmission = true;


    try {
      this.authService.createUser(this.registerForm.value as IUser);
    }
    catch (e) {
      console.log(e);
      this.alertMsg = 'unexpected error occured.Pleas try again after sometime.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return
    }
    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}
