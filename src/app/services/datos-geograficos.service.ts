import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
const BASE_API = 'https://apis.datos.gob.ar/georef/api';

@Injectable()
export class DatosGeograficosService {
    constructor(
        private http: HttpClient
    ) {}

    // SERVICIO PARA OBTENER LAS PROVINCIAS
    async getProvincias(): Promise<any> {
        try {
            const response = await this.http
                .get(`${BASE_API}/provincias`, HTTP_OPTIONS)
                .toPromise();
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

// SERVICIO PARA OBTENER LOS MUNICIPIOS
async getMunicipios(idProvincia: number): Promise<any> {
    try {
        const response = await this.http
            .get(`${BASE_API}/municipios?provincia=${idProvincia}&campos=id,nombre`, HTTP_OPTIONS)
            .toPromise();
        return response;
    } catch (error) {
        return this.handleError(error);
    }
}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}