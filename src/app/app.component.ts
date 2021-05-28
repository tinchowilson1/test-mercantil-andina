import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { Observable, of } from 'rxjs';
import { Cobertura } from './model/cobertura';
import { Usuario } from './model/usuario';
import { Vehiculo } from './model/vehiculo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  step = 1;
  title = 'test-mercantil-andina';
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
  usuarioRepetido = false;

  constructor(
    private ngWizardService: NgWizardService
  ) {
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
      showPreviousButton: false
    }
  };

  sendInfo(form: NgForm): void {
    this.datosPersonalesForm = form;
    this.ngWizardService.next();
  }

  public datosVehiculoNext(form: NgForm): void {
    this.datosVehiculoForm = form;
    this.ngWizardService.next();
  }

  seleccionarCobertura(cobertura: Cobertura): void {
    this.coberturaSeleccionada = cobertura;
    this.ngWizardService.next();
  }

  enviarDatos(): void {
    // this.toastr.success('Los datos fueron enviados correctamente', 'Éxito');
  }

  showPreviousStep(event?: Event): void {
    // this.ngWizardService.previous();
  }

  showNextStep(event?: Event): void {
    // this.ngWizardService.next();
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

