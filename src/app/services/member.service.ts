import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private httpClient: HttpClient) {}

  public viewBills(token: any, memberId: string, policyId: string) {
    const tkn = JSON.parse(token);
    let tokenStr = 'Bearer ' + tkn;
    let url = `http://localhost:8100/viewBills/${memberId}/${policyId}`;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<any>(url, { headers });
  }

  public getClaimStatus(
    token: any,
    memberId: string,
    policyId: string,
    claimId: string
  ) {
    const tkn = JSON.parse(token);
    let tokenStr = 'Bearer ' + tkn;
    let url = `http://localhost:8200/getClaimStatus/${memberId}/${policyId}/${claimId}`;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    console.log(token);

    return this.httpClient.get<any>(url, { headers });
  }

  public submitClaim(
    token: any,
    policyId: string,
    memberId: string,
    claim: any
  ) {
    const tkn = JSON.parse(token);
    let tokenStr = 'Bearer ' + tkn;
    console.log(claim);
    let url = `http://localhost:8200/submitclaim/${policyId}/${memberId}`;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.post<any>(url, claim, { headers });
  }
}
