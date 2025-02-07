import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated:boolean = false; // Set to false by default
  private authSecretKey:string = 'Bearer Token'; // Set the key for the token for localstorage

  constructor(private readonly api: ApiService) { 
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey); // Get Token from localStorage
  }

  /**
   * Function to check if the user is logged in
   * @returns Returns true if the user is logged in 
   */
  isLoggedIn(){
    this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
    return this.isAuthenticated
  }

  /**
   * Function to handle the login form submission and set token in local storage if the form is valid
   * @returns Returns the token if the login is successful
   */
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Login Post API
   * @param currentData The data to be sent to the API
   * @returns Returns the response from the API
   */
  public loginApi(currentData: any): Observable<any> {
    return this.api.post(`token`, currentData);
  }
}
