import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }
  submit(): void {
    this.loginService.loginUser(this.form.getRawValue()).then((res) => {
      if (res.message == "Success") {
        alert("user logged in successfully")
        this.router.navigate(['/']);
      } else {
        alert(res)
      }
    });
  }
}
