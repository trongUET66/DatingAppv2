import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ennvironment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = ennvironment.apiUrl;
  member: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.member.length > 0){
      return of(this.member);
    }
    return this.http.get<Member[]>(this.baseUrl+ 'users').pipe(
      map(members =>{
        this.member= members;
        return members;
      })
    );
  }

  getMember(username : string){
    const member =this.member.find(x=> x.username === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMem(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(()=>{
        const index = this.member.indexOf(member);
        this.member[index] = member;
      })
    );
  }
}
