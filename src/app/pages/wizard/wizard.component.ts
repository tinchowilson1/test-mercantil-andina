import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html'
})

export class WizardComponent implements OnInit {
    showNextButton = true;
    isValidTypeBoolean = true;
    model: any = {};
    datosPersonalesForm: FormGroup;

    constructor(
        private ngWizardService: NgWizardService,
        formBuilder: FormBuilder
    ) {
        this.datosPersonalesForm = formBuilder.group({
            dni: new FormControl('',
                Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)]))
        });
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
        lang: { next: 'Siguiente', previous: 'Anterior' },
        toolbarSettings: {
            showNextButton: this.showNextButton,
            toolbarExtraButtons: [
                { text: 'Finalizar', class: 'btn btn-dark', event: () => { alert('Finished!!!'); } }
            ],
        }
    };


    sendInfo() { }

    markAsTouched(form: NgForm) {
        for (const key in form.controls) {
            form.controls[key].markAsTouched();
            form.controls[key].markAsDirty();
        }
        return true;
    }

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
        if (args.position === 'final') {
            this.showNextButton = false;
        } else {
            this.showNextButton = true;
        }
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
