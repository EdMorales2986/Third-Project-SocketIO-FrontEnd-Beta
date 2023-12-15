import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss'],
})
export class CreateReviewComponent implements OnInit {
  @Input() review: any;
  rating: any;
  description: string = '';
  loading: boolean = false;

  pinFormatter(value: number) {
    return `${value}/5`;
  }

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  async addReview() {
    this.loading = true;
    const { value } = await Preferences.get({ key: 'alias' });

    this.http
      .post(`https://tmdb-for-a-angularmovile.onrender.com/reviews/${value}`, {
        mediaTitle: this.review.title,
        rating: this.rating,
        description: this.description,
      })
      .subscribe({
        next: (data: any) => {
          // console.log(data);
          this.loading = false;
          this.modalController.dismiss();
        },
        error: (err: HttpErrorResponse) => {
          this.alertController
            .create({
              header: 'Error',
              message: err.error.message,
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
          // console.log(err);
          this.loading = false;
          this.modalController.dismiss();
        },
      });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
