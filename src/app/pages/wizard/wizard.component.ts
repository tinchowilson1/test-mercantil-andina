import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { NgForm } from '@angular/forms';
import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { Cobertura } from 'src/app/model/cobertura';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';
import { MercantilAndinaService } from 'src/app/services/mercantil-andina.service';


@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html'
})

export class WizardComponent implements OnInit {
    showNextButton = true;
    isValidTypeBoolean = true;
    model: any = {};
    datosPersonalesForm: NgForm;
    datosVehiculoForm: NgForm;
    coberturas: Cobertura[];
    provincias: any[] = [];
    ciudades: any[] = [];
    marcas: any[] = [];
    modelos: any[] = [];
    versiones: any[] = [];
    usuarioRepetido = false;

    constructor(
        private ngWizardService: NgWizardService,
        private mockMercantilAndinaService: MockMercantilAndinaService,
        private datosGeograficosService: DatosGeograficosService,
        private mercantilAndinaService: MercantilAndinaService
    ) {
        this.getCoberturasDisponibles();
        this.getProvincias();
        this.getMarcas();
        this.model.Anio = '';
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
            showNextButton: false,
            showPreviousButton: false,
            toolbarExtraButtons: [
                { text: 'Finalizar', class: 'btn btn-dark', event: () => { alert('Finished!!!'); } }
            ],
        }
    };


    sendInfo(form: NgForm): void {
        this.datosPersonalesForm = form;
        this.ngWizardService.next();
    }

    datosVehiculoNext(form: NgForm): void {
        this.datosVehiculoForm = form;
        this.ngWizardService.next();
    }

    ngOnInit(): void {
        this.model.Ciudad = '';
    }

    private getCoberturasDisponibles(): void {
        this.mockMercantilAndinaService.getCoberturasDisponibles()
            .then(
                data => {
                    this.coberturas = data;
                })
            .catch(error => this.handleError(error));
    }

    private getProvincias(): void {
        this.datosGeograficosService.getProvincias()
            .then(
                data => {
                    if (data != null && data.provincias != null) {
                        this.provincias = data.provincias;
                        this.model.Provincia = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public cargarCiudades(): void {
        this.datosGeograficosService.getMunicipios(this.model.Provincia)
            .then(
                data => {
                    if (data != null && data.municipios != null) {
                        this.ciudades = data.municipios;
                        this.model.Ciudad = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public usuarioExist(form: NgForm): void {
        this.mockMercantilAndinaService.usuarioExist(this.model.Usuario)
            .then(
                data => {
                    this.usuarioRepetido = data;
                    if (this.usuarioRepetido) {
                        form.controls.Usuario.setErrors({
                            notUnique: true
                        });
                    }
                })
            .catch(error => this.handleError(error));
    }

    private getMarcas(): void {
        this.mercantilAndinaService.getMarcasList()
            .then(
                data => {
                    if (data != null) {
                        this.marcas = data;
                        this.model.Marca = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public getModelos(): void {
        this.mercantilAndinaService.getModelosList(this.model.Marca, this.model.Anio)
            .then(
                data => {
                    if (data != null && data.modelos != null) {
                        this.modelos = data.modelos;
                        this.model.Modelo = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public getVersiones(): void {
        this.mercantilAndinaService.getVersionesList(this.model.Marca, this.model.Anio, this.model.Modelo)
            .then(
                data => {
                    if (data != null && data.versiones != null) {
                        this.versiones = data.versiones;
                        this.model.Version = '';
                    }
                })
            .catch(error => this.handleError(error));
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

    markAsTouched(form: NgForm) {
        for (const key in form.controls) {
            form.controls[key].markAsTouched();
            form.controls[key].markAsDirty();
        }
        return true;
    }

    private handleError(error): void {
        console.log(error);
    }
}
