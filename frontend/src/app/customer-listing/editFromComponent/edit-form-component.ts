
import { Component, Inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { customerListing } from '../customerListing.service';
export interface DialogData {
    firstname: string;
    id: string;
    lastname: string;
    email: string;
    phone: string;
}

@Component({
    selector: 'edit-form-component',
    templateUrl: 'edit-form-component.html',
    styleUrls: ['./edit-form-component.css']
})
export class EditFormComponent {
    form: FormGroup;
    constructor(
        private customerListingService: customerListing,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<EditFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstname: this.data.firstname,
            lastname: this.data.lastname,
            email: this.data.email,
            phone: this.data.phone
        })
    }

    submit() {
        var request = {
            id: this.data.id,
            firstname: this.form.getRawValue().firstname,
            lastname: this.form.getRawValue().lastname,
            email: this.form.getRawValue().email,
            phone: this.form.getRawValue().phone,
        }
        this.customerListingService.updateInsertCustomers(request).then((res) => {
            if (res.status) {
                alert(res.msg)
                this.onNoClick();
            } else {
                alert(res.msg)

                this.onNoClick();
            }
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}