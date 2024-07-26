
// declare var L: any;
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import { DataService } from 'src/app/services/data.service';
import { Geolocation } from '@capacitor/geolocation';
import { debounceTime, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
//npm install leaflet esri-leaflet @types/leaflet @types/esri-leaflet --save

@Component({
  selector: 'app-map2',
  templateUrl: './map2.page.html',
  styleUrls: ['./map2.page.scss'],
})
export class Map2Page implements OnInit, OnDestroy {
  public map: any;
  public searchText: string = '';
  private searchSubject = new Subject<string>;
  private readonly debounceTimeMs = 2000;
  public markers: Array<any> = [];
  public resultList: Array<any> = [];
  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    const response: any = await Geolocation.getCurrentPosition();
    if (response) {
      let coords = response.coords;
      console.log('Coordinate ==> ', coords);
      this.dataService.setData('GEOLOCATION', [coords.latitude, coords.longitude]);
    }
    this.setSearchSubject();
  }

  setSearchSubject() {
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((text: any) => {
      this.beginSearch(text);
    });
  }

  async beginSearch(keyword: string) {
    console.log('call API for keyword', keyword);
    //start calling API
    let payload: any = { name: keyword }
    try {
      let response: any = await this.apiService.doPost('https://api.met.gov.my/v2/searchlocations', payload);
      if (response) {
        console.log(response);
        this.resultList = response.results;
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  onSearch() {
    this.resultList = [];
    this.searchSubject.next(this.searchText);
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  getGeolocation() {
    const coords = this.dataService.getData('GEOLOCATION');
    console.log(coords);
    this.setMarker(coords);
  }

  setMarker(coords_: any) {
    for(let marker of this.markers){
      this.map.removeLayer(marker);
    }
    this.searchText = '';
    let marker = L.marker(coords_).addTo(this.map);
    this.map.flyTo(coords_);
    this.markers.push(marker);
  }

  ionViewWillEnter() {
    this.map = L.map('map').setView([3.1634449, 101.686506], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    esri.dynamicMapLayer({
      url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/mobile_idengue/FeatureServer'
    }).addTo(this.map);
//https://mygis.mysa.gov.my/erica1/rest/services/iDengue/WM_idengue/FeatureServer
    let featureLayer: any = [
      {
        itemName: 'COMBI',
        url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/WM_idengue/FeatureServer/2',
        iconURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAApBJREFUOI2t1F9oVnUcx/HXHsyzdJGeLuIRSkjN1CwrZJAzpScvdCUWpqIMbagZybLIoXjjhaw/1Ag10qUQiENTITbGkFS8ECHyItCJGgou8KjoKYqmh+ny4vnJ4zN1hPiBAz++3/N9/36f7+/Hd5CHrEED5CqiKJqeTc/mGeJFfYbJuazbkfyF/O4kSY7/b2Acx9Vpdboj68zG2F+WGodpiWSdmQ7qVI/ugYEz1Kdn0u91ylmAOozCo/gHXWhGp4JqXfHv8Rtpmv5yT2A0KSpkJ7JtEhX2YjYeQR+u4ylMwCxswWpV6avpQUeNv33SO4GDs3z2o99UaMNb+At78DVOYwY+CMBPQtVqQy20U6up5cAFltsl1oBaXMVidOAzPINf8U6ANWEF9qJVTT6fn5gkyfES8HHLCD3LYTMO4ESweQPvooCZqMHbAT6fZFayzHYNJWC30WAM/sR67MBz+AJr8FPo66f4DnPCZlDZ3/JJlWAI/gix0UgCTAD0YjK+wjU8FnLXPVEOfNYN5w2WYWiIXcIkLEQrPg8V5zAWlQEKVXr6A6/42Qjdis93qeJlTMH2YDuv+A7XoiX0+myoH15clYAj7cd7OjA+FNXgzbB+EofDRrWKF9Qb+gx/21oOvGiN1y3WKKeAl3EknHKOktZjJYZhH3bhfVc1ay8HNrscfRttzg5lDeZjd4C2YAP+xfDw9aEdc0MvJ6rHf+VAZB9mH/nGS1aZ6hV8Gew9jRg9OBZsbsRIoo+jpmxF1nabcfdwWOU1P9hmp3qNKjTe9UdRS/TGhXhlWpe23Bm+9zxcYqkOTRbZ5IwaXaqckvOCm553xSjtejSkdem1/qX3H7C1zgXDJZ1WHBYDaKCJ/UC6Bco1vMY7MGV+AAAAAElFTkSuQmCC',
        template: '<p><strong>Lokaliti: </strong>{NAMA_LOKALITI}<br/><strong>Daerah: </strong>{DAERAH}<br/><strong>Negeri: </strong> {NEGERI}</p>'
      },
      {
        itemName: 'WOLBACHIA',
        url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/WM_idengue/FeatureServer/1',
        iconURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAArJJREFUSIntlb1LW1EYxn+DzSCBwqGhJEihih9QGrA3FpHglOsgNy6CxMkhYhH6H2TQIRndAhKpU4bcuARqxzsEhAyNd2oGI0QQJFGE0wauYnDpkA81ucbY2g6lz/jynvvjeZ9z3tvHX1TffxjgATSb+tafgAEkbGpfgPKTwYQQipRyPRKZwut1Mz7uplq9YmNjD10vfgZ8TwaTUq6n0/PawsLbO/VUapFwuKSoanIXCD4FzBMKjXaAmgoEhgiFRjVdL3p4YJwPwTyA5vcPdm3y+wfR9aImhDCllOajYM2MQqFRze8fZH7+DQCnpxaFwhmqmiSdnmd2dgyn8xlLS++oVKqJWCwHYAJz2Li0hbVnZFnXGEaJ7e2vAIRCo2QyBTKZAuHweyYnXxGNzhCNzmAYJUVVkwlsMuyACSGU1dWxOxk5nc+A+oWwrGsODs7w+QYA2N8/uXM+EBgiEpnSNjcPlPaRdsAuLi6CXq/bxu1lCzQx8YnDw4+43c85OvreAjfl9bqRMqdQH+n9sFqtpoyPd8KAFghgZCROPr9s29c4v0LbdrHLrFytXtl+xOcbIJ9f7nDWruPjKrS5soUJIbY2NvZWUqnFVs2yrjk/vwRgbOwl+fwyw8MvADg/r4+3mStANltCCLElpewOk1Kaui7NcLikBAJDDVgNl6ufnZ1vrb6mI5erH8uqtWCGUSIWy5k9OWvIp6rJ3dvvbHr69T2tcHLyg3g8h8PhqKytZU3gg11ftw0S1PWiR9eLWqVSTUSjM/c2xuM5YrHcnBCibOeoFxhAWQhhxmI5usEcDkdFCFHutqp6gdH4gGkYNxnelmGUaIyuK6gnWENzqppMRCJTWvN/dnxcJZttXQbbjH4VVgaC9RWUU6g/WFMIsUUPjh4LA25GSmMztL+jJ4X9rv5d2E9HfyvUqnjsHAAAAABJRU5ErkJggg==',
        template: '<p><strong>Lokaliti: </strong>{NAMA_LOKALITI}<br/><strong>Pejabat Kesihatan: </strong>{PEJABAT_KESIHATAN}<br/><strong>Negeri: </strong> {NEGERI} <br/><strong>Jumlah RC Dipasang: </strong>{JUMLAH_RC_DIPASANG}<br/><strong>Tarikh Mula Pelepasan: </strong>{TARIKH_MULA_PELEPASAN}</p>'
      },
      {
        itemName: 'WABAK',
        url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/WM_idengue/FeatureServer/3',
        iconURL: null,
        template: null
      }
    ];

    let layerControl = L.control.layers({}, {}).addTo(this.map);

    for (let feature of featureLayer) {
      this.createFeatureLayer(feature, layerControl);
    }
  }

  createFeatureLayer(feature_: any, layerControl_: any) {
    // const icon_ = L.icon({
    //   iconUrl: feature_.iconURL,
    //   iconSize: [25, 25]
    // });

    // let layer = esri.featureLayer({
    //   url: feature_.url,
    //   onEachFeature: (feature) => {
    //     console.log(feature);
    //     // console.log(layer);
    //   },
    //   pointToLayer: (geojson, latlng) => {
    //     // console.log(latlng);
    //     console.log(geojson);
    //     if (feature_.itemName == 'COMBI' || feature_.itemName == 'WOLBACHIA') {
    //       return L.marker(latlng, {
    //         icon: icon_
    //       });
    //     } else {
    //       return;
    //     }
    //   }
    // })

    // layer.bindPopup((layer_: any) => {
    //   return L.Util.template(
    //     feature_.template,
    //     layer_.feature.properties
    //   );
    // }); 

    const icon_ = L.icon({
      iconUrl: feature_.iconURL,
      iconSize: [25, 25]
    });

    let layer = esri.featureLayer({
      url: feature_.url,
      style: (feature: any) => {
        if (feature.geometry.type == "Polygon") {
          return { color: "red", weight: 2 };
        } else {
          return;
        }
      },
      pointToLayer: (geojson, latlng) => {
        if (feature_.itemName != 'WABAK') {
          return L.marker(latlng, {
            icon: icon_
          });
        } else {
          return;
        }
      },
      onEachFeature: (feature, layer) => {
        if (feature_.itemName == 'WABAK') {
          console.log(feature);
        }
      }
    })



    if (feature_.itemName != 'WABAK') {
      layer.bindPopup((layer_: any) => {
        if (feature_.itemName == 'WOLBACHIA') {
          let date = new Date(layer_.feature.properties.TARIKH_MULA_PELEPASAN);
          layer_.feature.properties.TARIKH_MULA_PELEPASAN = date.toLocaleString();
        }
        return L.Util.template(
          feature_.template,
          layer_.feature.properties
        );
      });
    }
    layer.addTo(this.map);

    layerControl_.addOverlay(layer, feature_.itemName);

    // layer.on('load', () => {
    //   console.log('test')
    //   layer.setStyle({
    //     color: 'red'
    //   })
    // });

  }

  /**
   * const icon_ = L.icon({
      iconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAApBJREFUOI2t1F9oVnUcx/HXHsyzdJGeLuIRSkjN1CwrZJAzpScvdCUWpqIMbagZybLIoXjjhaw/1Ag10qUQiENTITbGkFS8ECHyItCJGgou8KjoKYqmh+ny4vnJ4zN1hPiBAz++3/N9/36f7+/Hd5CHrEED5CqiKJqeTc/mGeJFfYbJuazbkfyF/O4kSY7/b2Acx9Vpdboj68zG2F+WGodpiWSdmQ7qVI/ugYEz1Kdn0u91ylmAOozCo/gHXWhGp4JqXfHv8Rtpmv5yT2A0KSpkJ7JtEhX2YjYeQR+u4ylMwCxswWpV6avpQUeNv33SO4GDs3z2o99UaMNb+At78DVOYwY+CMBPQtVqQy20U6up5cAFltsl1oBaXMVidOAzPINf8U6ANWEF9qJVTT6fn5gkyfES8HHLCD3LYTMO4ESweQPvooCZqMHbAT6fZFayzHYNJWC30WAM/sR67MBz+AJr8FPo66f4DnPCZlDZ3/JJlWAI/gix0UgCTAD0YjK+wjU8FnLXPVEOfNYN5w2WYWiIXcIkLEQrPg8V5zAWlQEKVXr6A6/42Qjdis93qeJlTMH2YDuv+A7XoiX0+myoH15clYAj7cd7OjA+FNXgzbB+EofDRrWKF9Qb+gx/21oOvGiN1y3WKKeAl3EknHKOktZjJYZhH3bhfVc1ay8HNrscfRttzg5lDeZjd4C2YAP+xfDw9aEdc0MvJ6rHf+VAZB9mH/nGS1aZ6hV8Gew9jRg9OBZsbsRIoo+jpmxF1nabcfdwWOU1P9hmp3qNKjTe9UdRS/TGhXhlWpe23Bm+9zxcYqkOTRbZ5IwaXaqckvOCm553xSjtejSkdem1/qX3H7C1zgXDJZ1WHBYDaKCJ/UC6Bco1vMY7MGV+AAAAAElFTkSuQmCC",
      iconSize: [25, 25]
    });

    let layer = esri.featureLayer({
      url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/mobile_idengue/MapServer/2',
      pointToLayer: (geojson, latlng) => {
        // console.log(latlng);
        console.log(geojson);
        return L.marker(latlng, {
          icon: icon_
        });
      }
    }).addTo(this.map);

    layer.bindPopup((layer_: any) => {
      return L.Util.template(
        "<p><strong>Lokaliti: </strong>{SPWD.AVT_HOTSPOTMINGGUAN.KODNEGERI}<br/><strong>Daerah: </strong> {DAERAH}<br/><strong>Negeri: </strong> {NEGERI}</p>", 
        layer_.feature.properties
      );
    });
   */

}
