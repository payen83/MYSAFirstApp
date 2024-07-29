import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
// import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  // swiperOptions!: SwiperOptions;
  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async setDoneTutorial(){
    await this.dataService.setLocalStorage('HAS_SEEN_TUTORIAL', true);
    this.router.navigateByUrl('/dashboard', { replaceUrl: true });
  }

}
