import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-outbreak',
  templateUrl: './outbreak.page.html',
  styleUrls: ['./outbreak.page.scss'],
})
export class OutbreakPage implements OnInit {
  outbreakList: any = [];
  outbreakListMaster: Array<any> = [];
  counter: number = 0;
  id: any = null;
  searchText: string = '';
  resultList: Array<any> = [];
  type: string = 'wabak';
  searchTextHotspot: string = '';
  hotspotList: Array<any> = [];
  hotspotListMaster: Array<any> = [];
  constructor(
    public apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  beginSearch() {
    if (this.type == 'wabak') {
      if (this.searchText.trim() != '') {
        console.log(this.searchText);
        this.resultList = this.outbreakListMaster.filter((item: any) => {
          return String(item.LOKALITI).toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
        })
        console.log(this.resultList);
      }
    } else {
      if (this.searchTextHotspot.trim() != '') {
        console.log(this.searchText);
        this.resultList = this.hotspotListMaster.filter((item: any) => {
          return String(item.LOKALITI).toLowerCase().indexOf(this.searchTextHotspot.toLowerCase()) > -1;
        })
        console.log(this.resultList);
      }
    }

  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log('NEGERI', this.id);
    let dataWabakAll = this.dataService.getData('WABAK');
    // console.log('data wabak', dataWabakAll);
    for (let item of dataWabakAll) {
      if (item.NEGERI == this.id) {
        this.outbreakListMaster.push(item);
      }
    }

    for (let i = 0; i <= 15; i++) {
      if (i >= this.outbreakListMaster.length) {
        break;
      } else {
        this.outbreakList.push(this.outbreakListMaster[i]);
      }
    }

    let dataHotspotAll = this.dataService.getData('HOTSPOT');
    // console.log('data wabak', dataWabakAll);
    for (let item of dataHotspotAll) {
      if (item.NEGERI == this.id) {
        this.hotspotListMaster.push(item);
      }
    }

    for (let i = 0; i <= 15; i++) {
      if (i >= this.hotspotListMaster.length) {
        break;
      } else {
        this.hotspotList.push(this.hotspotListMaster[i]);
      }
    }
  }

  onIonInfinite(event: any) {
    setTimeout(() => {
      this.counter += 1;
      for (let i = (this.counter); i <= (this.counter + 15); i++) {
        if (this.type == 'wabak' && i <= this.outbreakListMaster.length) {
          this.outbreakList.push(this.outbreakListMaster[i]);
        } else if (this.type == 'hotspot' && i <= this.hotspotListMaster.length) {
          this.hotspotList.push(this.hotspotListMaster[i]);
        }
      }
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

}
