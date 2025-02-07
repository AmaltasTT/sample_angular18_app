import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl:string; // Set the API base URL  
  
  constructor(private http: HttpClient) {
    // Set the API base URL based on the environment "Because Base IP depenedr upon the environment"
    if (window.location.origin.includes('localhost') ||
        window.location.origin.includes('4200'))
    {
      this.apiUrl = 'http://127.0.0.1:8000'
    }
    else{
      // APIs are in fastAPI (Python)
      this.apiUrl = window.location.origin.replace('4201', '8000'); // Replace the port number with the Django server port number
    }
  }

  // GET request
  get(endpoint: string, params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { params });
  }

  // POST request
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // PUT request
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  // PATCH request
  patch(endpoint: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${endpoint}`, data);
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
