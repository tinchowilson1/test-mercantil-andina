import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosVehiculoComponent } from './datos-vehiculo.component';

const routes: Routes = [
  { path: '',
    component: DatosVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosVehiculoRoutingModule {}
