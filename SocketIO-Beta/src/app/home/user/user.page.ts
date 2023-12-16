import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { UpdateemailComponent } from './updateemail/updateemail.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { UpdatenameComponent } from './updatename/updatename.component';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  alias: string = '';

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  changeEmail() {
    this.modalController
      .create({
        component: UpdateemailComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  changePassword() {
    this.modalController
      .create({
        component: UpdatepasswordComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  changeName() {
    this.modalController
      .create({
        component: UpdatenameComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  deleteAccount() {
    this.modalController
      .create({
        component: DeleteaccountComponent,
        cssClass: 'my-custom-class',
      })
      .then((modal) => {
        modal.present();
      });
  }

  async logout() {
    await Preferences.remove({ key: 'alias' });
    await Preferences.remove({ key: 'jwt' });
    await Preferences.clear();

    this.router.navigate(['/']);
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.alias = value!;
  }
}
