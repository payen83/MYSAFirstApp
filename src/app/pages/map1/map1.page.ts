import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import  Map  from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-map1',
  templateUrl: './map1.page.html',
  styleUrls: ['./map1.page.scss'],
})
export class Map1Page implements OnInit {
  public coords: any = { latitude: null, longitude: null };
  public map: any;
  constructor(private dataService: DataService) { }

  async ngOnInit() {
    const response: any = await Geolocation.getCurrentPosition();
    if(response){
      this.coords = response.coords;
      console.log('Coordinate ==> ', this.coords);
      this.dataService.setData('GEOLOCATION', [this.coords.latitude, this.coords.longitude])
      this.initMap();
    }
  }

  initMap(){

    this.map = new Map({
      basemap: 'topo-vector'
    });

    const view = new MapView({
      container: 'map-container',
      map: this.map,
      zoom: 15,
      center: [ this.coords.longitude, this.coords.latitude ]
    });

    const point = new Point({
      longitude: this.coords.longitude,
      latitude: this.coords.latitude
    });

    const simpleMarkerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40], //orange
      size: '30px',
      outline: {
        color: [255, 255, 255], //white
        width: 2
      }
    })

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    });

    const graphicsLayer = new GraphicsLayer();
    graphicsLayer.add(pointGraphic);
    this.map.add(graphicsLayer);

  }

}
