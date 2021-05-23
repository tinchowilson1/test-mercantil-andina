import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { NgForm } from '@angular/forms';

import { Cobertura } from 'src/app/model/cobertura';
import { Usuario } from 'src/app/model/usuario';
import { Vehiculo } from 'src/app/model/vehiculo';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';
import { MercantilAndinaService } from 'src/app/services/mercantil-andina.service';


@Component({
    selector: 'app-wizard',
    templateUrl: './wizard.component.html'
})

export class WizardComponent implements OnInit {
    showNextButton = true;
    isValidTypeBoolean = true;
    usuario = new Usuario();
    vehiculo = new Vehiculo();
    datosPersonalesForm: NgForm;
    datosVehiculoForm: NgForm;
    coberturas: Cobertura[];
    coberturaSeleccionada = new Cobertura();
    provincias: any[] = [];
    ciudades: any[] = [];
    marcas: any[] = [];
    modelos: any[] = [];
    versiones: any[] = [];
    botonFinalizar: any[] = [];
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
        this.vehiculo.Anio = '';
        this.vehiculo.Modelo = '';
        this.vehiculo.VersionId = '';
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
            toolbarExtraButtons: this.botonFinalizar,
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
        this.usuario.CiudadId = '';
    }

    private getCoberturasDisponibles(): void {
        this.mockMercantilAndinaService.getCoberturasDisponibles()
            .then(
                data => {
                    this.coberturas = data.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
                })
            .catch(error => this.handleError(error));
    }

    private getProvincias(): void {
        this.datosGeograficosService.getProvincias()
            .then(
                data => {
                    if (data != null && data.provincias != null) {
                        this.provincias = data.provincias;
                        this.usuario.ProvinciaId = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public cargarCiudades(): void {
        this.usuario.Provincia = this.provincias.find(p => p.id === this.usuario.ProvinciaId).nombre;
        this.datosGeograficosService.getMunicipios(this.usuario.ProvinciaId)
            .then(
                data => {
                    if (data != null && data.municipios != null) {
                        this.ciudades = data.municipios;
                        this.usuario.CiudadId = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    guardarCiudad(): void {
        this.usuario.Ciudad = this.ciudades.find(c => c.id === this.usuario.CiudadId).nombre;
    }

    guardarMarca(): void {
        this.vehiculo.Marca = this.marcas.find(c => c.codigo === parseInt(this.vehiculo.MarcaId, 10)).desc;
    }

    guardarVersion(): void {
        this.vehiculo.Version = this.versiones.find(c => c.codigo === parseInt(this.vehiculo.VersionId, 10)).desc;
    }

    public usuarioExist(form: NgForm): void {
        this.mockMercantilAndinaService.usuarioExist(this.usuario.Usuario)
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
                        this.vehiculo.MarcaId = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public getModelos(): void {
        this.mercantilAndinaService.getModelosList(this.vehiculo.MarcaId, this.vehiculo.Anio)
            .then(
                data => {
                    if (data != null) {
                        this.modelos = data;
                        this.vehiculo.Modelo = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    public getVersiones(): void {
        this.mercantilAndinaService.getVersionesList(this.vehiculo.MarcaId, this.vehiculo.Anio, this.vehiculo.Modelo)
            .then(
                data => {
                    if (data != null) {
                        this.versiones = data;
                        this.vehiculo.VersionId = '';
                    }
                })
            .catch(error => this.handleError(error));
    }

    seleccionarCobertura(cobertura: Cobertura): void {
        this.coberturaSeleccionada = cobertura;
        this.ngWizardService.next();
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
            this.botonFinalizar = [
                { text: 'Finalizar', class: 'btn btn-dark', event: () => { alert('Finished!!!'); } }
            ];
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
