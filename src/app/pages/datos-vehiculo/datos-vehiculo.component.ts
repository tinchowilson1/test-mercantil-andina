import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehiculo } from 'src/app/model/vehiculo';
import { MercantilAndinaService } from 'src/app/services/mercantil-andina.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-datos-vehiculo',
    templateUrl: './datos-vehiculo.component.html'
})

export class DatosVehiculoComponent implements OnInit {
    vehiculo = new Vehiculo();
    datosVehiculoForm: NgForm;
    marcas: any[] = [];
    modelos: any[] = [];
    versiones: any[] = [];

    constructor(
        private mercantilAndinaService: MercantilAndinaService,
        public appComponent: AppComponent,
        private router: Router
    ) {
        appComponent.step = 2;
        this.getMarcas();
        this.vehiculo.Anio = '';
        this.vehiculo.Modelo = '';
        this.vehiculo.VersionId = '';
    }

    ngOnInit(): void {
    }

    guardarMarca(): void {
        this.vehiculo.Marca = this.marcas.find(c => c.codigo === parseInt(this.vehiculo.MarcaId, 10)).desc;
    }

    guardarVersion(): void {
        this.vehiculo.Version = this.versiones.find(c => c.codigo === parseInt(this.vehiculo.VersionId, 10)).desc;
    }

    private getMarcas(): void {
        this.mercantilAndinaService.getMarcasList()
            .then(
                data => {
                    if (data != null) {
                        this.marcas = data;
                        this.vehiculo.MarcaId = '';
                        if (this.appComponent.vehiculo != null && this.appComponent.step2Complete) {
                            this.vehiculo.MarcaId = this.appComponent.vehiculo.MarcaId;
                            this.vehiculo.Anio = this.appComponent.vehiculo.Anio;
                            this.getModelos();
                        }
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
                        if (this.appComponent.vehiculo != null && this.appComponent.step2Complete) {
                            this.vehiculo.Modelo = this.appComponent.vehiculo.Modelo;
                            this.getVersiones();
                        }
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
                        if (this.appComponent.vehiculo != null && this.appComponent.step2Complete) {
                            this.appComponent.step2Complete = false;
                            this.vehiculo = this.appComponent.vehiculo;
                        }
                    }
                })
            .catch(error => this.handleError(error));
    }

    guardarDatos(form: NgForm): void {
        this.datosVehiculoForm = form;
        this.appComponent.vehiculo = this.vehiculo;
        this.appComponent.step2Complete = true;
        this.router.navigate(['/coberturas-disponibles']);
    }

    showPreviousStep(): void {
        this.router.navigate(['/datos-personales']);
    }

    private handleError(error): void {
        console.log(error);
    }
}
