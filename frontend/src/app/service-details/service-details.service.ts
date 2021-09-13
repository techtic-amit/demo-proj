import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServiceDetailsService {

    constructor(
        private readonly httpService: HttpClient,
    ) { }
    updateServiceDetails(request: any, userId: any) {
        console.log("user iD ", userId);
        return this.httpService.post(`http://localhost:3000/customer/insert-service/${userId}`, request).pipe(
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
    getDropdownState() {

        return this.httpService.get('http://localhost:3000/customer/getStateData').pipe(
            map((resp: any) => {

                return resp.data;
            }),
            catchError((error) => {
                return throwError(JSON.parse(JSON.stringify(error)));
            })
        )
            .toPromise()
            .then((data: any) => {

                return data;
            }).catch((error) => {
                throw error;
                return error;
            })
    }

    getDropdownCity(state_id: any) {

        return this.httpService.get(`http://localhost:3000/customer/getCityData/${state_id}`).pipe(
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