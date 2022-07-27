import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

var datasource: any;

@Component({
  selector: 'app-claimstatus',
  templateUrl: './claimstatus.component.html',
  styleUrls: ['./claimstatus.component.css'],
})
export class ClaimstatusComponent implements OnInit {
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
      claimid: ['', Validators.required],
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
        const cid = this.form.get('claimid')?.value;
        console.log(this.userAuthService.getToken());

        await this.service
          .getClaimStatus(this.userAuthService.getToken(), mid, pid, cid)
          .subscribe((data) => {
            console.log(data);
            const result = {
              claimId: cid,
              memberId: mid,
              claimStatus: data.claimStatus,
              claimDescription: data.claimDescription,
              policyId: pid,
            };
            datasource = new Array(result);
            this.router.navigate(['/claimstatus', mid, pid, cid]);
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
  selector: 'app-claimstatus-result',
  templateUrl: './claimstatus.result.html',
  styleUrls: ['./claimstatus.component.css'],
})
export class ClaimstatusResult implements OnInit {
  public data = datasource;
  displayedColumns: string[] = [
    'claimId',
    'memberId',
    'claimStatus',
    'claimDescription',
    'claimStatus',
    'policyId',
  ];
  ngOnInit() {
    this.data = datasource;
  }
}
