import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public RegistForm: FormGroup;
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
    this.RegistForm = this.formBuilder.group({
      foto: [''],
      username: ['', Validators.required],
      name: ['',Validators.required],
      sexo: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirpassword: ['', Validators.required]
    });

  }
  onSubmit() {
  const
    data:any = this.RegistForm.value
  ;
  if (data.password === data.confirpassword && data.username) {
    this._userService.register(data).subscribe(
      (response: any) => {
        // console.log(response);
        if (response.status === 200) {
          if(response.data){
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(response.data));
            this.router.navigate(['dashboard']);
          }else{
            Swal.fire('Error Con La Consulta');
          }
        } else {
          Swal.fire('No se pudo registrar  revisa los datos ingresados o prueba un nombre de usuario diferente!');
        }
      },
      error => {
        Swal.fire('Los datos son incorrectos o el usuario ya existe!');
      }
    );
  } else {
    Swal.fire('Por Favor Mirar Los Errores que Salen en El Formulario y Llenarlos Todos Para Continuar Gracias!');
  }
}

}
