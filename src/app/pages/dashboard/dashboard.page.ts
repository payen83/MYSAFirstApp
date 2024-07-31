import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public kesHarian: any = "Loading..";
  public showOverlay: boolean = false;

  public showStep1: boolean = false;
  public showStep2: boolean = false;
  public showStep3: boolean = false;

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    //check storage HAS_SEEN_TUTORIAL
    let HAS_SEEN_TUTORIAL = await this.dataService.getLocalStorage('HAS_SEEN_TUTORIAL');

    if (!HAS_SEEN_TUTORIAL) {
      this.showOverlay = true;
      this.showStep1 = true;
    }

    setTimeout(() => {
      let stats: any = this.dataService.getData('STATS');
      // console.log(stats);
      let sum = 0;
      for (let item of stats) {
        sum += Number(item.KES_HARIAN);
      }
      this.kesHarian = sum;
    }, 10000)
  }

  step1() {
    this.showStep1 = false;
    this.showStep2 = true;
  }

  step2() {
    this.showStep2 = false;
    this.showStep3 = true;
  }

  async step3() {
    this.showOverlay = false;
    this.showStep3 = false;
    return await this.dataService.setLocalStorage('HAS_SEEN_TUTORIAL', true);
  }

}
