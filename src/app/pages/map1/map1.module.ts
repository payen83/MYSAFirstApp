import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Map1PageRoutingModule } from './map1-routing.module';

import { Map1Page } from './map1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Map1PageRoutingModule
  ],
  declarations: [Map1Page]
})
export class Map1PageModule {}
