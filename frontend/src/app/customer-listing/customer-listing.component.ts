import { Component, OnInit, ViewChild } from '@angular/core';
import { customerListing } from './customerListing.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Emitters } from '../emitters/emitters';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from './editFromComponent/edit-form-component';
@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css']
})
export class CustomerListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cutomerData: any;

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'Action'];

  constructor(private customerListService: customerListing,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    Emitters.authEmitter.emit(true)
    this.customerListService.getAllCustomers().then((res) => {
      console.log(res.data)
      this.cutomerData = new MatTableDataSource(res.data);
      this.cutomerData.paginator = this.paginator;
    });
  }

  openDialog(request: any): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '250px',
      data: {
        id: request.id,
        firstname: request.firstname,
        lastname: request.lastname,
        email: request.email,
        phone: request.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.customerListService.getAllCustomers().then((res) => {
        console.log(res.data)
        this.cutomerData = new MatTableDataSource(res.data);
        this.cutomerData.paginator = this.paginator;

      });
    });
  }
  delete1(id: any) {
    //delete
    this.customerListService.DeleteCustomer(id).then((res) => {
      console.log(res)
      alert("Record Deleted Successfully")
      this.customerListService.getAllCustomers().then((res) => {
        this.cutomerData = new MatTableDataSource(res.data);
        this.cutomerData.paginator = this.paginator;

      });

    });
  }
}
