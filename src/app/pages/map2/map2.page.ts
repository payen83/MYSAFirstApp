
// declare var L: any;
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
//npm install leaflet esri-leaflet @types/leaflet @types/esri-leaflet --save
 
@Component({
  selector: 'app-map2',
  templateUrl: './map2.page.html',
  styleUrls: ['./map2.page.scss'],
})
export class Map2Page implements OnInit {
  public map: any;
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.map = L.map('map').setView([3.1634449, 101.686506], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    esri.dynamicMapLayer({
      url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/mobile_idengue/MapServer'
    });

    let featureLayer: any = [
      {
        itemName: 'COMBI',
        url: 'https://mygis.mysa.gov.my/erica1/rest/services/iDengue/mobile_idengue/MapServer/0',
        iconURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAApBJREFUOI2t1F9oVnUcx/HXHsyzdJGeLuIRSkjN1CwrZJAzpScvdCUWpqIMbagZybLIoXjjhaw/1Ag10qUQiENTITbGkFS8ECHyItCJGgou8KjoKYqmh+ny4vnJ4zN1hPiBAz++3/N9/36f7+/Hd5CHrEED5CqiKJqeTc/mGeJFfYbJuazbkfyF/O4kSY7/b2Acx9Vpdboj68zG2F+WGodpiWSdmQ7qVI/ugYEz1Kdn0u91ylmAOozCo/gHXWhGp4JqXfHv8Rtpmv5yT2A0KSpkJ7JtEhX2YjYeQR+u4ylMwCxswWpV6avpQUeNv33SO4GDs3z2o99UaMNb+At78DVOYwY+CMBPQtVqQy20U6up5cAFltsl1oBaXMVidOAzPINf8U6ANWEF9qJVTT6fn5gkyfES8HHLCD3LYTMO4ESweQPvooCZqMHbAT6fZFayzHYNJWC30WAM/sR67MBz+AJr8FPo66f4DnPCZlDZ3/JJlWAI/gix0UgCTAD0YjK+wjU8FnLXPVEOfNYN5w2WYWiIXcIkLEQrPg8V5zAWlQEKVXr6A6/42Qjdis93qeJlTMH2YDuv+A7XoiX0+myoH15clYAj7cd7OjA+FNXgzbB+EofDRrWKF9Qb+gx/21oOvGiN1y3WKKeAl3EknHKOktZjJYZhH3bhfVc1ay8HNrscfRttzg5lDeZjd4C2YAP+xfDw9aEdc0MvJ6rHf+VAZB9mH/nGS1aZ6hV8Gew9jRg9OBZsbsRIoo+jpmxF1nabcfdwWOU1P9hmp3qNKjTe9UdRS/TGhXhlWpe23Bm+9zxcYqkOTRbZ5IwaXaqckvOCm553xSjtejSkdem1/qX3H7C1zgXDJZ1WHBYDaKCJ/UC6Bco1vMY7MGV+AAAAAElFTkSuQmCC',
        template: '<p><strong>Lokaliti: </strong>{NAMA_LOKALITI}<br/><strong>Daerah: </strong>{DAERAH}<br/><strong>Negeri: </strong> {NEGERI}</p>'
      },
      //hotspot dll
      //data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAUdJREFUOI2t0rFqVEEUBuDvbC5cwxoJKyhpBRtBfAE7tbGzsLOyEPENtE1jYxPyCEoqEWz1BawMtoIoCGsRLpGQ6DG6k2KzyeVmWZLFv5o5M3ycM0zlP6WaLAoX8CvYb18oLAU7nVrgPP4EeQQVLuErzhV+YrtQBRexOOJfsIU99I3rIzzEy3ZH97F4uF7GcrQ6CBZwuTPNAh50oTunfYtObhX6we4EujInVBkMrmqazQm0P/P67PTG4jg/5maaZngElbrejMy7czDfgmMo+v23Mp+dVSl1/UamY6hpPhTe4/YZnL3IfDHZVK2DJ/ho/OFOk6fB9xNQ8LnU9T2Zr7E0Syhs9Fhr19odicx3ZWXlpqbZkHltivEbq8Hz7kHVLcRw+KlwA4/xCNexVer6VWSuBV+mdXkCguAv1rFeGGC7lzmaOudhDgDyu1trpRziSAAAAABJRU5ErkJggg==
    ]

    for(let feature of featureLayer){
      this.createFeatureLayer(feature.url, feature.iconURL, feature.template);
    }
   
  }

  createFeatureLayer(url_: string, iconUrl_: string, template_: string){
    const icon_ = L.icon({
      iconUrl: iconUrl_,
      iconSize: [25, 25]
    });

    let layer = esri.featureLayer({
      url: url_,
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
        template_,
        layer_.feature.properties
      );
    });
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
