import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private toastService: ToastService) { }

    ngOnInit(): void {
        this.toastService.changeMessage(
            {
                isError: false,
                isSuccess: false,
                isInfo: false
            }
        );
    }
}
