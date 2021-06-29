import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdiPage } from './pdi.page';

const routes: Routes = [
  {
    path: '',
    component: PdiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdiPageRoutingModule {}
