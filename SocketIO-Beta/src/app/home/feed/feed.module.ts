import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';

import { CoversComponent } from '../covers/covers.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedPageRoutingModule],
  declarations: [FeedPage, CoversComponent],
})
export class FeedPageModule {}
