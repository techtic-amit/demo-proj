import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  authenticated = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    })
  }

  logout(): void {
    this.http.post('http://localhost:3000/customer/logout', {}, { withCredentials: true }).subscribe(() => this.authenticated = false)
  }
}
