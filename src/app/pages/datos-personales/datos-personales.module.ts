import { NgModule } from '@angular/core';

import { SharedModule } from '../../utils/shared.module';
import { DatosPersonalesRoutingModule } from './datos-personales.routing';

import { DatosPersonalesComponent } from './datos-personales.component';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';

@NgModule({
    imports: [
        DatosPersonalesRoutingModule,
        SharedModule
    ],
    declarations: [
        DatosPersonalesComponent,
    ],
    providers: [
        MockMercantilAndinaService,
        DatosGeograficosService
    ]
})
export class DatosPersonalesModule { }
