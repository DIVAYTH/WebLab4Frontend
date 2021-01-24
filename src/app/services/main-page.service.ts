import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Results} from "../classes/results";
import {Point} from "../classes/point";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  private url = 'http://localhost:14073/WebLab4-0.0.1-SNAPSHOT/main';
  private results = '/getResults';
  private point = '/sendPoint';
  private reset = '/reset';

  constructor(private http: HttpClient) {
  }

  public getResult() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ":" + localStorage.getItem('password'))
    });
    return this.http.get<Array<Results>>(this.url + this.results, {headers})
  }

  public sendPoint(point: Point) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ":" + localStorage.getItem('password'))
    });
    return this.http.post<Results>(this.url + this.point, point, {headers});
  }

  public resetPoint() {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(localStorage.getItem('login') + ":" + localStorage.getItem('password'))
    });
    return this.http.post<Results>(this.url + this.reset, {}, {headers});
  }
}
