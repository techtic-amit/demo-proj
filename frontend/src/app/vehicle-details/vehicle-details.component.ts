import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleDetailsService } from './vehicle-details.service';
import { HomeService } from '../home/home.service';
import { Emitters } from '../emitters/emitters';
var arr = new Array();
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  form: FormGroup;
  vehivleData: any;
  MakeYear: any = [];
  ModelName: any = ['Model A', 'Model B'];
  userId: any;
  constructor(
    private formBuilder: FormBuilder,
    private vehicleDetailService: VehicleDetailsService,
    protected homeService: HomeService,
  ) { }
  // get formArr() {
  //   return (<FormArray>this.form.get('formArr')).controls;
  // }
  ngOnInit(): void {
    Emitters.authEmitter.emit(true)
    this.getDropdownModel();
    this.getDropdownMake();
    this.form = this.formBuilder.group({
      vin: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern("^[0-9]*$")
      ]),
      mileage: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      makeYear: new FormControl('', [Validators.required]),
      modelName: new FormControl('', [Validators.required]),
    })
  }
  changeMake(e: any) {
    console.log(e.target.value);
  }

  changeModel(e: any) {
    console.log(e.target.value);
  }
  getDropdownModel() {
    this.vehicleDetailService.getDropdownModel().then((res) => {
      console.log(res)
      this.ModelName = res;
    });
  }
  getDropdownMake() {
    this.vehicleDetailService.getDropdownMake().then((res) => {
      console.log(res)
      this.MakeYear = res;
    });
  }
  get vin() {
    return this.form.get('vin');
  }
  get mileage() {
    return this.form.get('mileage');
  }
  get makeYear() {
    return this.form.get('makeYear');
  }
  get modelName() {
    return this.form.get('modelName');
  }

  submit(): void {
    if (this.vin?.invalid || this.makeYear?.invalid || this.modelName?.invalid || this.mileage?.invalid) {
      alert("Please fill all required details")
    }
    else {
      arr.push(this.form.getRawValue());

      console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        this.vehicleDetailService.updateVehicleDetails(arr[i]).then((res) => {
          console.log(res)
        });
      }
      alert("Vehicle Added Successfully");
      arr = new Array();
    }

  }
  AddForm() {
    if (this.vin?.invalid || this.makeYear?.invalid || this.modelName?.invalid || this.mileage?.invalid) {
      alert("Please fill all required details")
    }
    else {
      arr.push(this.form.getRawValue());
      console.log(arr);
      this.form.reset();
      //console.log("SERVICE DATA ", arr);
      this.vehivleData = arr;
      // const control = new FormControl(null, [Validators.required]);
      // (<FormArray>this.form.get('formArr')).push(control);
    }

  }

}
