import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(
        private readonly httpService: HttpClient,

    ) { }
    getUser() {

        return this.httpService.get('http://localhost:3000/customer/loggedInUser', { withCredentials: true }).pipe(
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