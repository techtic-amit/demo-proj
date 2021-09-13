import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VehicleDetailsService {

    constructor(
        private readonly httpService: HttpClient,
    ) { }
    updateVehicleDetails(request: any) {

        return this.httpService.post(`http://localhost:3000/customer/insert-vehicle`, request).pipe(
            map((resp: any) => {

                return resp.data;
            }),
            catchError((error) => {
                return throwError(JSON.parse(JSON.stringify(error)));
            })
        )
            .toPromise()
            .then((data: any) => {
                console.log("RESP DAATA", data)
                return data;
            }).catch((error) => {
                throw error;
            })
    }
    getDropdownModel() {

        return this.httpService.get('http://localhost:3000/customer/getModelData').pipe(
            map((resp: any) => {

                return resp.data;
            }),
            catchError((error) => {
                return throwError(JSON.parse(JSON.stringify(error)));
            })
        )
            .toPromise()
            .then((data: any) => {
                console.log("RESP DAATA", data)
                return data;
            }).catch((error) => {
                throw error;
                return error;
            })
    }

    getDropdownMake() {

        return this.httpService.get('http://localhost:3000/customer/getMakeData').pipe(
            map((resp: any) => {

                return resp.data;
            }),
            catchError((error) => {
                return throwError(JSON.parse(JSON.stringify(error)));
            })
        )
            .toPromise()
            .then((data: any) => {
                console.log("RESP DAATA", data)
                return data;
            }).catch((error) => {
                throw error;
                return error;
            })
    }

}