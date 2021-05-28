import { Component, OnInit } from '@angular/core';

import { Cobertura } from 'src/app/model/cobertura';

import { MockMercantilAndinaService } from 'src/app/services/mock-mercantil-andina.service';

import { AppComponent } from 'src/app/app.component';

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
    ) {
        appComponent.step = 3;
        this.getCoberturasDisponibles();
    }

    ngOnInit(): void {
    }

    private getCoberturasDisponibles(): void {
        this.mockMercantilAndinaService.getCoberturasDisponibles()
            .then(
                data => {
                    this.coberturas = data.sort((a, b) => (a.puntaje < b.puntaje) ? 1 : -1);
                })
            .catch(error => this.handleError(error));
    }

    private handleError(error): void {
        console.log(error);
    }
}
