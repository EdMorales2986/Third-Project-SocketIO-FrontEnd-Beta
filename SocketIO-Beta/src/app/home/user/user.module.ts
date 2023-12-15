import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';

import { UpdateemailComponent } from './updateemail/updateemail.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { UpdatenameComponent } from './updatename/updatename.component';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserPageRoutingModule],
  declarations: [
    UserPage,
    UpdateemailComponent,
    UpdatepasswordComponent,
    UpdatenameComponent,
    DeleteaccountComponent,
  ],
})
export class UserPageModule {}
