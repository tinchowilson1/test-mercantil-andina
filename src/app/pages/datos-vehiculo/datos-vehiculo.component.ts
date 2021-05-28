import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehiculo } from 'src/app/model/vehiculo';
import { MercantilAndinaService } from 'src/app/services/mercantil-andina.service';
import { AppComponent } from 'src/app/app.component';


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

    private handleError(error): void {
        console.log(error);
    }
}
