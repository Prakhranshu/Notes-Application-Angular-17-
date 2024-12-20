import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      service: 'advance'
  });
  this.fb.group({
    confirmPassword: ['', [Validators.required]]
  })
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = { ...this.signupForm.value };
      console.log(formData);
      this.userService.signUp(formData).subscribe({
        //res => console.log("Signup Successfull",res)

        next: (response:any) => {
          console.log('Signup successful', response);
        },
        error: (error:any) => {
          console.error('Signup failed', error);
        }
    });
    } else {
      console.error('Form is invalid');
    }
  }
}


