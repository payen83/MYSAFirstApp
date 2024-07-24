import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NegeriPageRoutingModule } from './negeri-routing.module';

import { NegeriPage } from './negeri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NegeriPageRoutingModule
  ],
  declarations: [NegeriPage]
})
export class NegeriPageModule {}
