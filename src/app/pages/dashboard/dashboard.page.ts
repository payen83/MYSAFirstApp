import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public kesHarian: any = "Loading..";
  constructor(private dataService: DataService) { }

  ngOnInit() {
    setTimeout(()=>{
      let stats: any = this.dataService.getData('STATS');
      console.log(stats);
      let sum = 0;
      for(let item of stats){
        sum += Number(item.KES_HARIAN);
      }
      this.kesHarian = sum; 
    }, 10000)
  }
 
}
