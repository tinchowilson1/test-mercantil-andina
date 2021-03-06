import { Component, OnInit } from '@angular/core';

import { Cobertura } from 'src/app/model/cobertura';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';

import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-coberturas-disponibles',
    templateUrl: './coberturas-disponibles.component.html'
})

export class CoberturasDisponiblesComponent implements OnInit {
    coberturas: Cobertura[];
    coberturaSeleccionada = new Cobertura();

    constructor(
        private mockMercantilAndinaService: MockMercantilAndinaService,
        public appComponent: AppComponent,
        private router: Router
    ) {
        appComponent.step = 3;
        this.getCoberturasDisponibles();
    }

    ngOnInit(): void {
        window.scroll(0, 0);
    }

    private getCoberturasDisponibles(): void {
        this.mockMercantilAndinaService.getCoberturasDisponibles()
            .then(
                data => {
                    this.coberturas = data.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
                    this.coberturas.map((item: Cobertura) => {
                        item.granizoMostrar = item.granizo ? 'Si' : 'No';
                    });
                    if (this.appComponent.coberturaSeleccionada != null && this.appComponent.step3Complete) {
                        this.coberturaSeleccionada = this.appComponent.coberturaSeleccionada;
                    }
                })
            .catch(error => this.handleError(error));
    }

    guardarDatos(cobertura: Cobertura): void {
        this.coberturaSeleccionada = cobertura;
        this.appComponent.coberturaSeleccionada = this.coberturaSeleccionada;
        this.appComponent.step3Complete = true;
        this.router.navigate(['/resumen']);
    }

    showPreviousStep(): void {
        this.router.navigate(['/datos-vehiculo']);
    }

    showNextStep(): void {
        if (this.appComponent.step3Complete) {
            this.router.navigate(['/resumen']);
        }
    }

    private handleError(error): void {
        console.log(error);
    }
}
