import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form: any;

  userName!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userName = new FormControl('');
    this.password = new FormControl('');

    this.loginForm = this.fb.group({
      userName: this.userName,
      password: this.password,
    });
  }

  login() {
    //console.log(this.userName.value, this.password.value);
    // validate and re-direct to home page
  }
}
