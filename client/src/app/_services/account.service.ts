import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';
import { ennvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = ennvironment.apiUrl;
  private currentUserSource= new ReplaySubject<User | null>(1);
  currentUser$=this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((reponse: User)=>{
        const user =reponse;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any){
      return this.http.post<User>(this.baseUrl+ 'account/register', model).pipe(
        map((user: User)  => {
          if(user){
            this.setCurrentUser(user);
          } 
        })
      )
  }

  setCurrentUser(user: User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
