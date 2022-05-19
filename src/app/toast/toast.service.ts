import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
    public showToast!: IToast;
    public subject = new Subject<any>();
    private messageSource = new BehaviorSubject(this.showToast);
    public currentMessage = this.messageSource.asObservable();

    changeMessage(message: IToast): void {
        this.messageSource.next(message);
        setTimeout(() => {
            this.messageSource.next({
                isError: false,
                isSuccess: false,
                isInfo: false
            });
        }, 3000);
    }
}

export interface IToast {
    message?: string;
    isError?: boolean;
    isSuccess?: boolean;
    isInfo?: boolean;
}
