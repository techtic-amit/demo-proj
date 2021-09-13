import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceDetailsService } from './service-details.service';
import { HomeService } from '../home/home.service';
import { Emitters } from '../emitters/emitters';
var arr = new Array();
@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {
  panelOpenState = false;
  form: FormGroup;
  serviceData: any;
  City: any = [];
  State: any = [];
  userId: any;
  constructor(
    private formBuilder: FormBuilder,
    private serviceDetailService: ServiceDetailsService,
    protected homeService: HomeService,
  ) { }
  // get formArr() {
  //   return (<FormArray>this.form.get('formArr')).controls;
  // }
  ngOnInit(): void {
    Emitters.authEmitter.emit(true);
    this.getUserInfo();
    this.getDropdownStates();
    let docDate = new Date();
    this.form = this.formBuilder.group({
      nickname: new FormControl('', Validators.required),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      cityName: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      zip: new FormControl(''),
      date: new FormControl(new Date(docDate).toISOString().slice(0, -1)),
      ven: new FormControl('')
    })
  }
  changeCity(e: any) {
    console.log(e.target.value);

  }
  getDropdownStates() {
    this.serviceDetailService.getDropdownState().then((res) => {

      this.State = res;
      console.log("STATE DATA ", this.State)
    });
  }

  changeState(e: any) {

    this.serviceDetailService.getDropdownCity(this.form.getRawValue().stateName.id).then((res) => {
      console.log(res)
      this.City = res;
    });
  }
  getUserInfo() {
    this.homeService.getUser().then((res) => {

      this.userId = res.id;
    });
  }
  get nickname() {
    return this.form.get('nickname');
  }
  get address1() {

    return this.form.get('address1');
  }
  get stateName() {

    return this.form.get('stateName');
  }
  get cityName() {

    return this.form.get('cityName');
  }

  submit(): void {
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        this.serviceDetailService.updateServiceDetails(arr[i], this.userId).then((res) => {
          console.log(res)
          this.form.reset();
        });
      }
      alert("Service Booked");
      arr = new Array();
    }
    else if (this.nickname?.invalid || this.address1?.invalid || this.stateName?.invalid || this.cityName?.invalid) {
      alert("Please fill the required details");
    }
    else {
      arr.push(this.form.getRawValue());


      for (var i = 0; i < arr.length; i++) {
        this.serviceDetailService.updateServiceDetails(arr[i], this.userId).then((res) => {
          console.log(res)
          this.form.reset();
        });
      }
      alert("Service Booked");
      arr = new Array();
    }

  }
  AddForm() {
    if (this.nickname?.invalid || this.address1?.invalid || this.stateName?.invalid || this.cityName?.invalid) {
      alert("Please fill the required details");
    }
    else {
      console.log(arr)
      arr.push(this.form.getRawValue());
      this.form.reset();
      //console.log("SERVICE DATA ", arr);
      this.serviceData = arr;
      // const control = new FormControl(null, [Validators.required]);
      // (<FormArray>this.form.get('formArr')).push(control);

    }

  }

}
