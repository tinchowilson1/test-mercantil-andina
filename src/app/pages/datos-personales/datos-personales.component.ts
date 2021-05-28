import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from 'src/app/model/usuario';

import { AppComponent } from 'src/app/app.component';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-datos-personales',
    templateUrl: './datos-personales.component.html'
})

export class DatosPersonalesComponent implements OnInit {
    usuario = new Usuario();
    datosPersonalesForm: NgForm;
    provincias: any[] = [];
    ciudades: any[] = [];
    usuarioRepetido = false;

    constructor(
        private mockMercantilAndinaService: MockMercantilAndinaService,
        private datosGeograficosService: DatosGeograficosService,
        public appComponent: AppComponent,
        private router: Router
    ) {
        appComponent.step = 1;
        this.getProvincias();
    }

    ngOnInit(): void {
        window.scroll(0, 0);
        this.usuario.CiudadId = '';
    }

    private getProvincias(): void {
        this.datosGeograficosService.getProvincias()
            .then(
                data => {
                    if (data != null && data.provincias != null) {
                        this.provincias = data.provincias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
                        this.usuario.ProvinciaId = '';
                        if (this.appComponent.usuario != null && this.appComponent.step1Complete) {
                            this.usuario.ProvinciaId = this.appComponent.usuario.ProvinciaId;
                            this.cargarCiudades();
                        }
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
                        this.ciudades = data.municipios.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
                        this.usuario.CiudadId = '';
                        if (this.appComponent.usuario != null && this.appComponent.step1Complete) {
                            this.appComponent.step1Complete = false;
                            this.usuario = this.appComponent.usuario;
                        }
                    }
                })
            .catch(error => this.handleError(error));
    }

    guardarCiudad(): void {
        this.usuario.Ciudad = this.ciudades.find(c => c.id === this.usuario.CiudadId).nombre;
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

    public correctDate(form: NgForm): void {
        const hoy = new Date();
        const cumpleanos = new Date(form.controls.FechaNacimiento.value);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        const m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        if (edad < 18) {
            form.controls.FechaNacimiento.setErrors({
                mini: true
            });
        }

        if (edad >= 99) {
            form.controls.FechaNacimiento.setErrors({
                maxi: true
            });
        }
    }

    guardarDatos(form: NgForm): void {
        this.datosPersonalesForm = form;
        if (this.usuarioRepetido) {
            this.appComponent.markAsTouched(form);
        } else {
            this.appComponent.usuario = this.usuario;
            this.appComponent.step1Complete = true;
            this.router.navigate(['/datos-vehiculo']);
        }
    }

    private handleError(error): void {
        console.log(error);
    }
}
