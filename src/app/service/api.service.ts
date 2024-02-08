import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi='http://localhost:8080/history/postgres/all'
  private urlApi2='http://localhost:8080/history/mysql/all'

  constructor(private http: HttpClient) { }

    public getDataPostgres():Observable<any>{
      return this.http.get<any>(this.urlApi);
    }

    public getDataMySql():Observable<any>{
      return this.http.get<any>(this.urlApi2);
    }
}
