import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutbreakPage } from './outbreak.page';

const routes: Routes = [
  {
    path: '',
    component: OutbreakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutbreakPageRoutingModule {}
