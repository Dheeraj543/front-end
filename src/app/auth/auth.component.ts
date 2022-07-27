import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MemberService } from '../services/member.service';
import { UserAuthService } from '../services/user-auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  public token: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userAuthService: UserAuthService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userAuthService.setToken(' ');
    this.userAuthService.setLog(false);
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        let userResponse = {
          username: username,
          password: password,
        };

        await this.authService.login(userResponse).subscribe(
          (data) => {
            this.token = data?.token;
            this.userAuthService.setToken(this.token);
            this.userAuthService.setLog(true);
            this.router.navigate(['/home']);
          },
          (error) => (this.loginInvalid = true)
        );
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
