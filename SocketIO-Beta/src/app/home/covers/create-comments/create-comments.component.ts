import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-create-comments',
  templateUrl: './create-comments.component.html',
  styleUrls: ['./create-comments.component.scss'],
})
export class CreateCommentsComponent implements OnInit {
  @Input() origin: any;
  desc: string = '';
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async addComment() {
    const { value } = await Preferences.get({ key: 'alias' });
    const id = this.origin;
    const comment = {
      owner: value,
      origin: id,
      desc: this.desc,
    };

    this.loading = true;

    this.http.post(`http://localhost:4000/comments/create`, comment).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.modalController.dismiss();
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

  ngOnInit() {
    // console.log(this.origin);
  }
}
