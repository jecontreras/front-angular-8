import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private _authSrvice: AuthService
  ) {
    if (this._authSrvice.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this._userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        // console.log(response);
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.router.navigate(['dashboard']);
        } else {
          Swal.fire('El usuario o la contraseña son incorrectos!');
        }
      },
      error => {
        Swal.fire('Problema con el servidor!');
        console.log(<any>error);
      }
    );
  }
}
