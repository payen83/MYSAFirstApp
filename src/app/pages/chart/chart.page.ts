import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DataService } from 'src/app/services/data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  public category: any;
  // public chartOptions!: Partial<ChartOptions>;
  public chartOptions: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private loadingCtrl: LoadingController
  ) { 
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
    this.setChart([], []);
  }

  setTitle(){
    return this.category.replace(/_/g," ");
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 5000,
    });
    loading.present();
  }

  ngOnInit() {
    this.showLoading();
    setTimeout(()=>{
      let stats = this.dataService.getData('STATS');
      let states = stats.map((item: any) => { return item.NEGERI }); // item['NEGERI']; //item['LOKALITI.DAERAH.XYZ']
      let values = stats.map((item: any) => { return item[this.category] });
      this.setChart(states, values);
      console.log(states);
    }, 5000);
  }

  setChart(states: any, values: any) {
    this.chartOptions = {
      series: [
        {
          name: this.setTitle(),
          data: values
        }
      ],
      dataLabels: {
        textAnchor: 'start',
        style: {
          colors: ["grey"]
        },
        formatter: (val: any, opt: any) => { return opt.w.globals.labels[opt.dataPointIndex] + ": " + val },
        offsetX: -5,
        offsetY: -16
      },
      plotOptions: {
        bar: {
          barHeight: "45%",
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          }
        }
      },
      grid: {
        show: false
      },
      chart: {
        height: 700,
        type: "bar",
        toolbar: { show: false }
      },
      title: {
        text: "STATISTIK BAGI " + this.setTitle() + " MENGIKUT NEGERI"
      },
      xaxis: {
        categories: states
        // categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };
  }

}
