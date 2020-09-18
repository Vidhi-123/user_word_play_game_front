import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { DialogOverviewExampleDialog  } from "./tab1.page";
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {MatDialogModule} from '@angular/material/dialog';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [
    Tab1Page,
    DialogOverviewExampleDialog
  ]
})
export class Tab1PageModule {}
