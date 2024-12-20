import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;
  constructor(private httpservice: HttpService) { }

  signUp(reqData: any) {
    let Header = {
      Headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }

    return this.httpservice.postService('https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', reqData, false, Header);
  }

  login(reqData: any) {
    let Header = {
      Headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }

    return this.httpservice.postService('https://fundoonotes.incubation.bridgelabz.com/api/user/login', reqData, false, Header);
  }
}
