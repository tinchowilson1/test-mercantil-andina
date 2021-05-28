import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from 'src/app/model/usuario';

import { AppComponent } from 'src/app/app.component';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';
import { DatosGeograficosService } from 'src/app/services/datos-geograficos.service';


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
    ) {
        appComponent.step = 1;
        this.getProvincias();
    }

    ngOnInit(): void {
        this.usuario.CiudadId = '';
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

    private handleError(error): void {
        console.log(error);
    }
}
