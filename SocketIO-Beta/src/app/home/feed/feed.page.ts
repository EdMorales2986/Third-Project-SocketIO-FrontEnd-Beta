import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CoversComponent } from '../covers/covers.component';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  coverM: any = [];
  coverS: any = [];
  user: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    public modalController: ModalController
  ) {}

  openModal1(cover: any) {
    this.modalController
      .create({
        component: CoversComponent,
        componentProps: {
          cover: cover,
          // coverS: this.coverS,
        },
      })
      .then((modal) => modal.present());
  }

  openModal2(cover: any) {
    this.modalController
      .create({
        component: CoversComponent,
        componentProps: {
          // coverM: this.coverM,
          cover: cover,
        },
      })
      .then((modal) => modal.present());
  }

  async ngOnInit() {
    this.http
      .get('https://tmdb-for-a-angularmovile.onrender.com/movies')
      .subscribe((data: any) => {
        this.coverM = data;
        // console.log(this.coverM[0].genres);
      });

    this.http
      .get('https://tmdb-for-a-angularmovile.onrender.com/series')
      .subscribe((data: any) => {
        this.coverS = data;
      });

    const data = await Preferences.get({ key: 'alias' });
    this.user = data.value!;

    // console.log(data);
  }

  async ionViewDidEnter() {
    this.coverM = [];
    this.coverS = [];

    this.http
      .get('https://tmdb-for-a-angularmovile.onrender.com/movies')
      .subscribe((data: any) => {
        this.coverM = data;
        // console.log(this.coverM[0].genres);
      });

    this.http
      .get('https://tmdb-for-a-angularmovile.onrender.com/series')
      .subscribe((data: any) => {
        this.coverS = data;
      });
  }
}
