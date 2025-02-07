import Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup; // FormGroup is a class that tracks the value and validity state of a group of FormControl instances.

  constructor(private formbBuilder: FormBuilder, private authService: AuthService, private readonly router: Router,){
    // If user is already logged in, redirect to mould page which is the landing page
    if(this.authService.isLoggedIn())
      this.router.navigate([`/mould`]);
    
    // Initialize the login form with email and password fields
    this.loginForm = this.formbBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  ngOnInit(): void { }

 
  /**
   *  Function to handle the login form submission and set token in local storage if the form is valid
   */
  onLogin() {
    if (this.loginForm.valid) {
      Notiflix.Loading.circle();
      const userEmail = this.loginForm.value.email
      const userPassword = this.loginForm.value.password
      // Reset the form
      let data = {
        "username": userEmail,
        "password": userPassword
      }

      this.authService.loginApi(data).subscribe(loginResult =>{
        const token = loginResult.access_token
        localStorage.setItem('Bearer Token', JSON.stringify(token));
        Notiflix.Notify.success('Logged in successfully!');
        Notiflix.Loading.remove();
        this.router.navigate([`/mould`]);
      },
      err =>{
        this.router.navigate([`/mould`]);
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.error.detail);
      })
    }
  }

}
