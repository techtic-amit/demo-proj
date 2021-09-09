import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Emitters } from '../emitters/emitters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = "You are not Logged In"
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getUser().then((res) => {
      if (res.message && res.message == "Unauthorized") {
        this.message = `You are not Logged In`

        Emitters.authEmitter.emit(false)

      }
      else {
        this.message = `Hii ${res.firstname}`
        Emitters.authEmitter.emit(true)
      }
    });
  }

}
