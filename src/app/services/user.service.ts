import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private appUrl:string;
  private apiUrl:string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.endpoint
    this.apiUrl = 'api/users'
  }

  signIn(user:User):Observable<any>{
    return this.http.post(`${this.appUrl}${this.apiUrl}`, user)
  }

  login(user: User):Observable <string>{
    return this.http.post<string>(`${this.appUrl}${this.apiUrl}/login`, user)
  }
}
