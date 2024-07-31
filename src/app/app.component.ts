import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { Storage } from '@ionic/storage-angular';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Map', url: '/map2', icon: 'map' },
    { title: 'Maklumbalas', url: '/maklumbalas', icon: 'mail' },
    { title: 'Hotspot & Wabak', url: '/negeri', icon: 'paper-plane' },
    { title: 'Dashboard', url: '/dashboard', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = [];
  constructor(
    private apiService: ApiService, 
    private dataService: DataService,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.router.navigateByUrl('/map2', { replaceUrl: true }); 
    await this.storage.create();
    
    // let HAS_SEEN_TUTORIAL = await this.dataService.getLocalStorage('HAS_SEEN_TUTORIAL');
    // if(HAS_SEEN_TUTORIAL){
    //   this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    // } else {
    //   this.router.navigateByUrl('/start', { replaceUrl: true });
    // }

    await this.retrieveAPI('https://idengue.mysa.gov.my/folder_AppIdengue/getstatistic.php', 'STATS');
    await this.retrieveAPI('https://idengue.mysa.gov.my/folder_AppIdengue/gethotspot.php', 'HOTSPOT');
    await this.retrieveAPI('https://idengue.mysa.gov.my/folder_AppIdengue/getWABAK.php', 'WABAK');
  }

  async retrieveAPI(url: string, key: string){
    let response: any = await this.apiService.doGet(url);
    if(response){
      // console.log(response);
      this.dataService.setData(key, response);
    }
  }
}
