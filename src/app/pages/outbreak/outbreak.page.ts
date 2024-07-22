import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-outbreak',
  templateUrl: './outbreak.page.html',
  styleUrls: ['./outbreak.page.scss'],
})
export class OutbreakPage implements OnInit {
  outbreakList: any = [];
  outbreakListMaster: any = [];
  counter: number = 0;
  constructor(public apiService: ApiService) { }

  async ngOnInit() {
    let response: any = await this.apiService.doGet('https://spwd.mysa.gov.my/apps_idengue/getcluster_info.php');
    console.log(response);
    this.outbreakListMaster = response;
    for(let i = 0; i <= 15; i++){
      this.outbreakList.push(this.outbreakListMaster[i]);
    }
  }//spwd

  onIonInfinite(event: any){
    console.log(event);
    

    setTimeout(() => {
      this.counter += 1;
      // todo check if 
      for(let i = (this.counter); i<=(this.counter + 15); i++){

        this.outbreakList.push(this.outbreakListMaster[i]);
      }
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

}
