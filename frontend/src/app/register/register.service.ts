import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(
        private readonly httpService: HttpClient,
    ) { }
    updateInsertCustomers(request: any) {
        console.log(request);
        return this.httpService.post('http://localhost:3000/customer/update-customer', request).pipe(
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

}