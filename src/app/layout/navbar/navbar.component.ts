import {Component, OnInit} from '@angular/core';
import {IUser} from "../../usuarios/usuarios.models";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  user!: IUser;
  menu = '2';
  myForm = this.fb.group({
    select: [null]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getSessionUser()!;
  }
  onChangeValue(event: any){
    console.log('Entrando en change pass',event.target.value );
    console.log('algo',this.myForm.get(['select']));

    let valor = event.target.value;
    if(valor === '2'){
      console.log('Elegiste la opcion 2');
      this.router.navigate(['cuenta/cambiar-clave'])
    }else if(valor ==='3'){
      this.logout();
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
