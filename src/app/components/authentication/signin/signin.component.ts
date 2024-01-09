import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  constructor(private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private NgxSpinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    if (this._authService.loggedIn()) {
      this.router.navigate(['/administrativo/dashboard']);
    }
  }

  signIn() {
    this.NgxSpinnerService.show();

    this._authService.loginService(this.user)
      .subscribe((response: any) => {
        if (response.statusCode == 200) {
          localStorage.setObject('user', response.result);

          this.router.navigate(['/administrativo/dashboard']);
        } else {
          this.toastr.warning(response.message);
        }

        this.NgxSpinnerService.hide();
      });
  }
}
