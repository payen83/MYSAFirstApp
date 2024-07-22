import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutbreakPageRoutingModule } from './outbreak-routing.module';

import { OutbreakPage } from './outbreak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutbreakPageRoutingModule
  ],
  declarations: [OutbreakPage]
})
export class OutbreakPageModule {}
