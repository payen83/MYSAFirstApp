import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NegeriPage } from './negeri.page';

const routes: Routes = [
  {
    path: '',
    component: NegeriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegeriPageRoutingModule {}
