import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';


@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html'
})

export class WizardComponent implements OnInit {

    constructor(private ngWizardService: NgWizardService) {
    }
    stepStates = {
        normal: STEP_STATE.normal,
        disabled: STEP_STATE.disabled,
        error: STEP_STATE.error,
        hidden: STEP_STATE.hidden
    };

    config: NgWizardConfig = {
        selected: 0,
        theme: THEME.arrows,
        toolbarSettings: {
            toolbarExtraButtons: [
                { text: 'Finish', class: 'btn btn-info', event: () => { alert('Finished!!!'); } }
            ],
        }
    };

    isValidTypeBoolean = true;

    ngOnInit(): void {
    }

    showPreviousStep(event?: Event): void {
        this.ngWizardService.previous();
    }

    showNextStep(event?: Event): void {
        this.ngWizardService.next();
    }

    resetWizard(event?: Event): void {
        this.ngWizardService.reset();
    }

    setTheme(theme: THEME): void {
        this.ngWizardService.theme(theme);
    }

    stepChanged(args: StepChangedArgs): void {
        console.log(args.step);
    }

    isValidFunctionReturnsBoolean(args: StepValidationArgs): boolean {
        return true;
    }

    isValidFunctionReturnsObservable(args: StepValidationArgs): Observable<boolean> {
        return of(true);
    }

    private handleError(error): void {
        // this.app.showLoader = false;
        // this.app.showNotification('error', error);
    }
}
