import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-negeri',
  templateUrl: './negeri.page.html',
  styleUrls: ['./negeri.page.scss'],
})
export class NegeriPage implements OnInit {
  public shape: string = 'assets/shapes.svg';
  public stateList: Array<any> = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    let data = this.getState();
    if(data){
      this.stateList = data;
      console.log(this.stateList);

    }  else{
      setTimeout(()=>{
        this.stateList = this.getState();
      }, 5000);
    }
  }

  getState(){
    return this.dataService.getData('STATS');
  }
}
