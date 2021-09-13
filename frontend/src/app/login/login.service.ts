import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        private readonly httpService: HttpClient,

    ) { }
    loginUser(request: any) {
        console.log(request);
        return this.httpService.post('http://localhost:3000/customer/login', request, { withCredentials: true }).pipe(
            map((resp: any) => {

                return resp;
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
                alert("Invalid Crediantials");
                throw error;

            })
    }

}