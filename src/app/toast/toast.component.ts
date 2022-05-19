import { Component, OnInit } from '@angular/core';
import { IToast, ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

    message!: string;
    isError = false;
    isSuccess = false;
    isInfo = false;

    constructor(private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.toastService.currentMessage.subscribe(
            (message: IToast) => {
                if (message) {
                    this.message = message.message!;
                    this.isError = message.isError!;
                    this.isSuccess = message.isSuccess!;
                    this.isInfo = message.isInfo!;
                }
            }
        );
    }

    closeAllToast(): void {
        this.toastService.changeMessage(
            {
                isError: false,
                isSuccess: false,
                isInfo: false
            }
        );
    }

}
