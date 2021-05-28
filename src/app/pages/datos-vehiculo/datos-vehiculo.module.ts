import { NgModule } from '@angular/core';

import { SharedModule } from '../../utils/shared.module';
import { DatosVehiculoComponent } from './datos-vehiculo.component';
import { DatosVehiculoRoutingModule } from './datos-vehiculo.routing';
import { MercantilAndinaService } from 'src/app/services/mercantil-andina.service';

@NgModule({
    imports: [
        DatosVehiculoRoutingModule,
        SharedModule
    ],
    declarations: [
        DatosVehiculoComponent,
    ],
    providers: [
        MercantilAndinaService
    ]
})
export class DatosVehiculoModule { }
