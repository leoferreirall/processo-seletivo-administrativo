import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private urlAPI = "http://localhost:9001/api/v1/tasks";

  constructor(private _http: HttpClient) { }

  getTasks(){
    return this._http.get(this.urlAPI).pipe(
      (response: any) => response
    )
  }
}
