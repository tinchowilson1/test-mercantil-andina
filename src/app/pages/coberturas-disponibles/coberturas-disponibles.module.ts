import { NgModule } from '@angular/core';

import { SharedModule } from '../../utils/shared.module';
import { CoberturasDisponiblesRoutingModule } from './coberturas-disponibles.routing';

import { CoberturasDisponiblesComponent } from './coberturas-disponibles.component';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';

@NgModule({
    imports: [
        CoberturasDisponiblesRoutingModule,
        SharedModule
    ],
    declarations: [
        CoberturasDisponiblesComponent,
    ],
    providers: [
        MockMercantilAndinaService,
    ]
})
export class CoberturasDisponiblesModule { }
