import { NgModule } from '@angular/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { WizardComponent } from './wizard.component';
import { DatosPersonalesComponent } from 'src/app/pages/datos-personales/datos-personales.component';
import { DatosVehiculoComponent } from 'src/app/pages/datos-vehiculo/datos-vehiculo.component';
import { CoberturasDisponiblesComponent } from 'src/app/pages/coberturas-disponibles/coberturas-disponibles.component';
import { ResumenComponent } from 'src/app/pages/resumen/resumen.component';
import { WizardRoutingModule } from './wizard.routing';
import { SharedModule } from '../../utils/shared.module';
import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { MercantilAndinaService } from 'src/app/services/mercantil-andina.service';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';

const ngWizardConfig: NgWizardConfig = {
    theme: THEME.arrows
};

@NgModule({
    imports: [
        WizardRoutingModule,
        NgWizardModule.forRoot(ngWizardConfig),
        SharedModule
    ],
    declarations: [
        WizardComponent,
        DatosPersonalesComponent,
        DatosVehiculoComponent,
        CoberturasDisponiblesComponent,
        ResumenComponent
    ],
    providers: [
        MockMercantilAndinaService,
        MercantilAndinaService,
        DatosGeograficosService
    ]
})
export class WizardModule { }
