import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { DomSanitizer } from '@angular/platform-browser';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ViewCommentsComponent } from './view-comments/view-comments.component';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.scss'],
})
export class CoversComponent implements OnInit {
  @Input() cover: any;
  safeURL: any;
  reviews: any = [];
  user: string = '';

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async addReview() {
    const { value } = await Preferences.get({ key: 'alias' });

    this.modalController
      .create({
        component: CreateReviewComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          review: this.cover,
        },
      })
      .then((modal) => {
        modal.onDidDismiss().then(() => this.loadReviews());
        modal.present();
      });
  }

  async deleteReview(review: any) {
    const { value } = await Preferences.get({ key: 'alias' });
    const encodedTitle = encodeURI(review.mediaTitle);

    this.http
      .delete(
        `https://tmdb-for-a-angularmovile.onrender.com/reviews/${value}/${encodedTitle}`
      )
      .subscribe((data: any) => {
        this.loadReviews();
        // console.log(data);
      });
  }

  async loadReviews() {
    const data = await Preferences.get({ key: 'alias' });
    this.user = data.value!;

    this.http
      .post('https://tmdb-for-a-angularmovile.onrender.com/all/reviews', {
        mediaTitle: this.cover.title,
      })
      .subscribe((data: any) => {
        this.reviews = data;
        // console.log(this.reviews);
      });
  }

  async viewComments(origin: any) {
    // console.log(origin);

    this.modalController
      .create({
        component: ViewCommentsComponent,
        componentProps: {
          origin: origin._id,
        },
      })
      .then((modal) => {
        modal.onDidDismiss().then(() => this.loadReviews());
        modal.present();
      });
  }

  async ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.cover.trailerURL
    );
    // console.log(this.safeURL);
    // console.log(this.cover.genres);

    this.loadReviews();
  }
}
