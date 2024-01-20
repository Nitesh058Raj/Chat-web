import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/shared.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: any;

  userName!: FormControl;
  loginForm!: FormGroup;

  userDetails!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = new FormControl('');

    this.loginForm = this.fb.group({
      userName: this.userName,
    });
  }

  login() {
    if (this.loginForm.invalid || this.loginForm.value.userName === '') {
      return;
    }

    this.userDetails = {
      name: this.loginForm.value.userName,
    };

    this.userService.setUserDetails(this.userDetails);
    this.router.navigate(['/chat-window']);
  }

  ngOnDestroy() {
    this.form.reset();
  }
}
