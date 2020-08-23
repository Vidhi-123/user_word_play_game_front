import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ExistingPageRoutingModule } from './existing-routing.module';
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

import { ExistingPage } from './existing.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    ExistingPageRoutingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ExistingPage]
})
export class ExistingPageModule {}
