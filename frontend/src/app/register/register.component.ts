import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required,
      Validators.minLength(4)
      ]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)]),
      communicationMethod: new FormControl('', [Validators.required]),
    })
  }
  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get phone() {
    return this.form.get('phone');
  }

  get communicationMethod() {
    return this.form.get('communicationMethod');
  }
  submit(): void {

    if (this.firstname?.invalid || this.lastname?.invalid || this.email?.invalid || this.phone?.invalid || this.communicationMethod?.invalid || this.password?.invalid) {
      alert("Please fill all required details")
    }
    else {
      this.registerService.updateInsertCustomers(this.form.getRawValue()).then((res) => {
        if (res.status) {
          alert("Registered Successfully")
          this.router.navigate(['/login'])

        } else {
          alert(res.msg)
        }
      });
    }

  }


}
