import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformPageRoutingModule } from './inform-routing.module';

import { InformPage } from './inform.page';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CalendarCommonModule} from "angular-calendar";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InformPageRoutingModule,
        NgbPaginationModule,
        CalendarCommonModule
    ],
  declarations: [InformPage]
})
export class InformPageModule {}
