import {Component, OnInit} from '@angular/core';
import {IUser} from '../../usuarios/usuarios.models';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    user!: IUser;
    menu = '2';
    myForm = this.fb.group({
        select: [null]
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.user = this.authService.getSessionUser()!;
        console.log('iniciando');
    }

    onChangeValue(event: any): void {
        let valor = event.target.value;
        if (valor === '2') {
            this.myForm.setValue({select: '1'});
            this.router.navigate(['cuenta/cambiar-clave']);
        } else if (valor === '3') {
            this.myForm.setValue({select: '1'});
            this.logout();
        }

    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['login']);
    }
}
