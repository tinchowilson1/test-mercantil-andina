import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  step1Complete = false;
  step2Complete = false;
  step3Complete = false;
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
    private router: Router,
  ) {
    this.router.navigate(['/datos-personales']);
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

