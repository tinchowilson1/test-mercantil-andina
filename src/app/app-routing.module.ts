import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'wizard',
    loadChildren: () => import('./pages/wizard/wizard.module').then(m => m.WizardModule),
  },
  // si no existe ir a pantalla por defecto
  { path: '**', redirectTo: 'wizard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
