import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

var datasource: any;

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css'],
})
export class SubmitclaimComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: MemberService,
    private userAuthService: UserAuthService
  ) {
    this.form = this.fb.group({
      memberId: ['', Validators.required],
      policyId: ['', Validators.required],
      amount: ['', Validators.required],
      hospitalId:['',Validators.required],
      benefitsId:['',Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const mid = this.form.get('memberId')?.value;
        const pid = this.form.get('policyId')?.value;
        const amount = this.form.get('amount')?.value;
        const hId=this.form.get('hospitalId')?.value;
        const bId=this.form.get('benefitsId')?.value;
        console.log(hId);
        console.log(this.userAuthService.getToken());
        let claim = {
          claimAmount: amount,
          hospitalId: hId,
          benefitId: bId,
        };
        await this.service
          .submitClaim(this.userAuthService.getToken(), pid, mid, claim)
          .subscribe((data) => {
            datasource = data;
            localStorage.setItem('dt',JSON.stringify(data));
            console.log(data);
            this.router.navigate(['/submitview', mid, pid]);
          });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}


@Component({
  selector: 'app-submitclaim-view',
  templateUrl: './submitclaim.result.html',
  styleUrls: ['./submitclaim.component.css'],
})
export class ViewsubmitResult implements OnInit {
  public data: any = datasource;
  // displayedColumns: string[] = [
  //   'memberId',
  //   'lastPaidDate',
  //   'dueDate',
  //   'dueAmount',
  //   'lateCharge',
  //   'policyId',
  // ];
  ngOnInit() {
   
    let obj=localStorage.getItem('dt');
   // console.log("ls",JSON.parse(obj));
    this.data = JSON.parse(obj || '');
    console.log(this.data.claimId);
    console.log("on sub",datasource);
  }
}
