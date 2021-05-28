import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoberturasDisponiblesComponent } from './coberturas-disponibles.component';

const routes: Routes = [
  { path: '',
    component: CoberturasDisponiblesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoberturasDisponiblesRoutingModule {}
