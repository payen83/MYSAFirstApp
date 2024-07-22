import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Map1Page } from './map1.page';

const routes: Routes = [
  {
    path: '',
    component: Map1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Map1PageRoutingModule {}
