import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../classes/user";
import {Response} from "../classes/response";

@Injectable({
  providedIn: 'root'
})
export class StartPageService {

  private url = 'http://localhost:14073/WebLab4-0.0.1-SNAPSHOT';
  private auth = "/authorization";
  private reg = "/registration";

  constructor(private http: HttpClient) {
  }

  public authorization(user: User) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user.login + ":" + user.password)
    });
    return this.http.get<Response>(this.url + this.auth, {headers})
  }

  public registration(user: User) {
    return this.http.post<Response>(this.url + this.reg, user);
  }
}
