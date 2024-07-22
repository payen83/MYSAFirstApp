import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaklumbalasPage } from './maklumbalas.page';

const routes: Routes = [
  {
    path: '',
    component: MaklumbalasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaklumbalasPageRoutingModule {}
