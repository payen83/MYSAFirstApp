import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaklumbalasPageRoutingModule } from './maklumbalas-routing.module';

import { MaklumbalasPage } from './maklumbalas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaklumbalasPageRoutingModule
  ],
  declarations: [MaklumbalasPage]
})
export class MaklumbalasPageModule {}
