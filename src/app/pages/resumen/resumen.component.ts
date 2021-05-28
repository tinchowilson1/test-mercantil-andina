import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Cobertura } from 'src/app/model/cobertura';
import { Usuario } from 'src/app/model/usuario';
import { Vehiculo } from 'src/app/model/vehiculo';

import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-resumen',
    templateUrl: './resumen.component.html'
})

export class ResumenComponent implements OnInit {
    usuario = new Usuario();
    vehiculo = new Vehiculo();
    coberturaSeleccionada = new Cobertura();

    constructor(
        private toastr: ToastrService,
        public appComponent: AppComponent
    ) {
        appComponent.step = 4;
    }

    ngOnInit(): void {
    }

    enviarDatos(): void {
        this.toastr.success('Los datos fueron enviados correctamente', 'Éxito');
    }

    private handleError(error): void {
        console.log(error);
    }
}
