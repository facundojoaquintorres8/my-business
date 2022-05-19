import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { homeRoute } from './home.route';

@NgModule({
    declarations: [HomeComponent],
    imports: [SharedModule, RouterModule.forChild(homeRoute)]
})

export class HomeModule { }
