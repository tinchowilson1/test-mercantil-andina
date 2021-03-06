import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
const BASE_API = environment.urlServicioMercantil;

@Injectable()
export class MercantilAndinaService {
    constructor(
        private http: HttpClient
    ) {}

    // SERVICIO PARA OBTENER LAS MARCAS
    async getMarcasList(): Promise<any> {
        try {
            const response = await this.http
                .get(`${BASE_API}/vehiculos/marcas`, HTTP_OPTIONS)
                .toPromise();
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // SERVICIO PARA OBTENER LOS MODELOS
    async getModelosList(codigo: string, anio: string): Promise<any> {
        try {
            const response = await this.http
                .get(`${BASE_API}/vehiculos/marcas/${codigo}/${anio}`, HTTP_OPTIONS)
                .toPromise();
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // SERVICIO PARA OBTENER LAS VERSIONES
    async getVersionesList(codigo: string, anio: string, modelo: string): Promise<any> {
        try {
            const response = await this.http
                .get(`${BASE_API}/vehiculos/marcas/${codigo}/${anio}/${modelo}`, HTTP_OPTIONS)
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
