import { NgModule } from '@angular/core';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

import { WizardComponent } from './wizard.component';
import { WizardRoutingModule } from './wizard.routing';

// import { UserService } from 'src/app/services/user.service';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const ngWizardConfig: NgWizardConfig = {
    theme: THEME.arrows
};

@NgModule({
    imports: [
        WizardRoutingModule,
        NgWizardModule.forRoot(ngWizardConfig)
        //   FontAwesomeModule,
    ],
    declarations: [
        WizardComponent,
    ],
    providers: [
        //   UserService,
    ]
})
export class WizardModule { }
