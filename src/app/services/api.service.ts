import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'http://localhost:8888/api';
  // private baseURL: string = 'https://idengue.mysa.gov.my/folder_AppIdengue';

  constructor(private httpClient: HttpClient) { }

  async doPost(endpoint: string, payload: any, isObject?: boolean){
    let token: any = 'AIzaSyCGrlM82ZvyE9tPK_QPFNlTLiiEkNK1B8E';
    let headers: any = {};
    let fullURL: string = endpoint;

    if(token){
      headers = { headers: new HttpHeaders({ 'X-Goog-Api-Key': token })
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

  doGet(endpoint: string, isGoogle?: boolean){
    let headers: any = {};
    if(isGoogle){
      let token = 'AIzaSyCGrlM82ZvyE9tPK_QPFNlTLiiEkNK1B8E';
        headers = { headers: new HttpHeaders(
          { 'X-Goog-Api-Key': token,
            'X-Goog-FieldMask': '*'
          }
        ).set('Content-Type', 'application/json')};
    }
    return new Promise((resolve, reject) => {
      this.httpClient.get(endpoint, headers)
      .subscribe({
        next: (response: any) => { resolve(response) },
        error: (error: any) => { reject(error) }
      })
    });
  }

}
