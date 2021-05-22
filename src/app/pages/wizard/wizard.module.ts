import { NgModule } from '@angular/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { WizardComponent } from './wizard.component';
import { WizardRoutingModule } from './wizard.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';

const ngWizardConfig: NgWizardConfig = {
    theme: THEME.arrows
};

@NgModule({
    imports: [
        WizardRoutingModule,
        NgWizardModule.forRoot(ngWizardConfig),
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        WizardComponent,
    ],
    providers: [
        MockMercantilAndinaService,
        DatosGeograficosService
    ]
})
export class WizardModule { }
