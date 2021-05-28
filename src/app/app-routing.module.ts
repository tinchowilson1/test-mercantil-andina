import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'datos-personales',
    loadChildren: () => import('./pages/datos-personales/datos-personales.module').then(m => m.DatosPersonalesModule),
  },
  {
    path: 'datos-vehiculo',
    loadChildren: () => import('./pages/datos-vehiculo/datos-vehiculo.module').then(m => m.DatosVehiculoModule),
  },
  {
    path: 'coberturas-disponibles',
    loadChildren: () => import('./pages/coberturas-disponibles/coberturas-disponibles.module').then(m => m.CoberturasDisponiblesModule),
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then(m => m.ResumenModule),
  },
  // si no existe ir a pantalla por defecto
  { path: '**', redirectTo: 'datos-personales' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
