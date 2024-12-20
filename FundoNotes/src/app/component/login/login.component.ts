import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {

  userInitial: string = '';
  userName: string = '';
  userEmail: string = '';
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    console.log('hello');
    if (this.loginForm.valid) {
      const logindata = { ...this.loginForm.value };
      this.userService.login(logindata).subscribe({
        next: (response: any) => {
          console.log('login successful', response);
          localStorage.setItem('token', response.id);
          localStorage.setItem('loggedInUser', JSON.stringify({firstName: response.firstName, lastName: response.lastName, email: response.email}));
          console.log(localStorage.getItem('token')); 
          this.route.navigate(['/dashboard/displayallnotes']);
        },
        error: (error: any) => {
          console.log('login failed', error);
        }
      })
    }
    else {
      console.log('login failed: form is invalid');
    }
  }
}
