import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.scss'],
})
export class DeleteaccountComponent implements OnInit {
  password: string = '';
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async deleteAccount() {
    const { value } = await Preferences.get({ key: 'alias' });
    this.loading = true;
    const password = this.password;

    this.http
      .delete(
        `https://tmdb-for-a-angularmovile.onrender.com/${value}/${password}`
      )
      .subscribe({
        next: (data: any) => {
          this.loading = false;
          this.modalController.dismiss();
          this.router.navigate(['/']);
        },
        error: async (error: HttpErrorResponse) => {
          this.loading = false;
          const alert = await this.alertController.create({
            header: 'Error',
            message: error.error.message,
            buttons: ['OK'],
          });
          this.modalController.dismiss();
          await alert.present();
        },
      });
  }

  ngOnInit() {}
}
