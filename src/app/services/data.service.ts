import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = {};
  constructor(private storage: Storage) { }

  setData(key: string, value: any){
    this.data[key] = value;
  }

  async setLocalStorage(key: string, value: any){
    return await this.storage.set(key, value);
  }

  async getLocalStorage(key: string){
    return await this.storage.get(key);
  }

  getData(key: string){
    return this.data[key];
  }
}
