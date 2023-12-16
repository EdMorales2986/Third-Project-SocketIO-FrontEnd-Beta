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
  showMoreMovies: boolean = false;
  showMoreTVShows: boolean = false;

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
        },
      })
      .then((modal) => modal.present());
  }

  openModal2(cover: any) {
    this.modalController
      .create({
        component: CoversComponent,
        componentProps: {
          cover: cover,
        },
      })
      .then((modal) => modal.present());
  }

  async ngOnInit() {
    this.loadData();
  }

  async ionViewDidEnter() {
    this.loadData();
  }

  async loadData() {
    this.coverM = await this.http.get('https://tmdb-for-a-angularmovile.onrender.com/movies').toPromise();
    this.coverS = await this.http.get('https://tmdb-for-a-angularmovile.onrender.com/series').toPromise();

    const data = await Preferences.get({ key: 'alias' });
    this.user = data.value!;
  }
}