import {Component, OnInit} from '@angular/core';
import {IUser} from "../../usuarios/usuarios.models";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  user!: IUser;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getSessionUser()!;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
