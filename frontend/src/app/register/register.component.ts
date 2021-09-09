import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phone: ''
    })
  }

  submit(): void {

    this.registerService.updateInsertCustomers(this.form.getRawValue()).then((res) => {
      if (res.status) {
        this.router.navigate(['/login'])

      } else {
        alert(res.msg)
      }
    });
  }


}
