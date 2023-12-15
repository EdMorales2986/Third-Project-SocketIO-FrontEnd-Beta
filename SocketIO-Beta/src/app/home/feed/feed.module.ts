import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';

import { CoversComponent } from '../covers/covers.component';
import { CreateReviewComponent } from '../covers/create-review/create-review.component';
import { ViewCommentsComponent } from '../covers/view-comments/view-comments.component';
import { CreateCommentsComponent } from '../covers/create-comments/create-comments.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FeedPageRoutingModule],
  declarations: [
    FeedPage,
    CoversComponent,
    CreateReviewComponent,
    ViewCommentsComponent,
    CreateCommentsComponent,
  ],
})
export class FeedPageModule {}
