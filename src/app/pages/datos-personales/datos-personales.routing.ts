import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosPersonalesComponent } from './datos-personales.component';

const routes: Routes = [
  { path: '',
    component: DatosPersonalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosPersonalesRoutingModule {}
