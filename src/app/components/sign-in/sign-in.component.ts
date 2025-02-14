import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService, private _userService:UserService, private router:Router, private _errorService:ErrorService) {}

  ngOnInit():void{

  }

  addUser(){
    //Se valida que el usuario ingrese valores

    if(this.username == "" || this.password == "" || this.confirmPassword== ""){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    //Se valida que las passwords sean iguales
    if(this.password != this.confirmPassword){
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    const user:User = {
      username : this.username,
      password : this.password
    }

    this.loading = true;

    this._userService.signIn(user).subscribe({
      next: (v) =>{
        this.loading = false;
        console.log("Usuario creado con exito");
        this.toastr.success(`El usuario ${this.username} fue registrado con exito`, "Usuario Registrado");
        this.router.navigate(['/login'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
}
