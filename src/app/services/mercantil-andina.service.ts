import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
const BASE_API = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';

@Injectable()
export class MockMercantilAndinaService {
    constructor(
        private http: HttpClient
    ) {}

    // SERVICIO PARA VER DISPONIBILIDAD DE USUARIO
    async usuarioExist(nombreUsuario: string): Promise<any> {
        try {
            const response = await this.http
                .get(`${BASE_API}/usuarios?nombre=${nombreUsuario}`, HTTP_OPTIONS)
                .toPromise();
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // SERVICIO PARA OBTENER LAS COBERTURAS DISPONIBLES
    async getCoberturasDisponibles(): Promise<any> {
        try {
            const response = await this.http
                .get(`${BASE_API}/coberturas`, HTTP_OPTIONS)
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
