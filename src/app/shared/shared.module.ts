import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './font-awesome-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgbModule,
        NgxDatatableModule.forRoot({
            messages: {
                emptyMessage: 'No hay datos',
                totalMessage: 'Total',
                selectedMessage: 'Seleccionados'
            }
        })
    ],
    exports: [
        FormsModule,
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ],
})
export class SharedModule {
    constructor(iconLibrary: FaIconLibrary) {
        iconLibrary.addIcons(...fontAwesomeIcons);
    }
}
