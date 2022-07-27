import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

var datasource: any;

@Component({
  selector: 'app-viewbill',
  templateUrl: './viewbill.component.html',
  styleUrls: ['./viewbill.component.css'],
})
export class ViewbillComponent implements OnInit {
  form: FormGroup;
  public invalid = false;
  private formSubmitAttempt = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: MemberService,
    private userAuthService: UserAuthService
  ) {
    this.form = this.fb.group({
      memberId: ['', Validators.required],
      policyId: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    this.invalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const mid = this.form.get('memberId')?.value;
        const pid = this.form.get('policyId')?.value;

        await this.service
          .viewBills(this.userAuthService.getToken(), mid, pid)
          .subscribe((data) => {
            datasource = data;
            localStorage.setItem('bills',JSON.stringify(datasource));
            console.log(data);
            if(data!='')
            this.router.navigate(['/viewbill', mid, pid]);
            else{
              window.alert("Bills are Empty");
            }
          });
      } catch (err) {
        this.invalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

@Component({
  selector: 'app-viewbill-result',
  templateUrl: './viewbill.result.html',
  styleUrls: ['./viewbill.component.css'],
})
export class ViewbillResult implements OnInit {
  public data: any = datasource;
  displayedColumns: string[] = [
    'memberId',
    'lastPaidDate',
    'dueDate',
    'dueAmount',
    'lateCharge',
    'policyId',
  ];
  ngOnInit() {
    this.data=JSON.parse(localStorage.getItem('bills') || '');
  //  this.data = datasource;
    console.log(this.data);
  }
}
