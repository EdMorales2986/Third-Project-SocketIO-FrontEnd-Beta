import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab2PageRoutingModule],
  declarations: [Tab2Page, ChatModalComponent],
})
export class Tab2PageModule {}
