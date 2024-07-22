import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'http://localhost:8888/api';
  constructor(private httpClient: HttpClient) { }

  async doPost(endpoint: string, payload: any, isObject?: boolean){
    let token: any = null;
    let headers: any = {};
    let fullURL: string = this.baseURL + endpoint;

    if(token){
      headers = { headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
      .set('Content-Type', 'application/json')};
    }

    if(!isObject){
      payload = JSON.stringify(payload);
    }

    return new Promise((resolve, reject) => {
      this.httpClient.post(fullURL, payload, headers)
      .subscribe({
        next: (response: any) => { resolve(response) },
        error: (error: any) => { reject(error) }
      })
    });
  }

  doGet(endpoint: string){
    return new Promise((resolve, reject) => {
      this.httpClient.get(endpoint)
      .subscribe({
        next: (response: any) => { resolve(response) },
        error: (error: any) => { reject(error) }
      })
    });
  }

}
