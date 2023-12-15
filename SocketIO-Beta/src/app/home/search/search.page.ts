import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { CoversComponent } from '../covers/covers.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  coverM: any = [];
  coverS: any = [];
  startYear: number = 1900;
  endYear: number = 2023;

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
          // coverS: this.coverM,
        },
      })
      .then((modal) => modal.present());
  }

  openModal2(cover: any) {
    this.modalController
      .create({
        component: CoversComponent,
        componentProps: {
          // coverM: this.coverS,
          cover: cover,
        },
      })
      .then((modal) => modal.present());
  }

  search(event: any) {
    this.coverM = [];
    this.coverS = [];
    if (event.target.value !== '') {
      this.http
        .post('https://tmdb-for-a-angularmovile.onrender.com/movies/search', {
          query: `${event.target.value}`,
        })
        .subscribe({
          next: (data: any) => {
            this.coverM = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });

      this.http
        .post('https://tmdb-for-a-angularmovile.onrender.com/series/search', {
          query: `${event.target.value}`,
        })
        .subscribe({
          next: (data: any) => {
            this.coverS = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    }
  }

  byDuration(event: any) {
    this.coverM = [];
    this.coverS = [];
    if (event.detail.value !== '') {
      this.http
        .get(
          `https://tmdb-for-a-angularmovile.onrender.com/movies/filter/duration/${event.detail.value}`
        )
        .subscribe({
          next: (data: any) => {
            this.coverM = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    }
  }

  byMovieGenre(event: any) {
    this.coverM = [];
    this.coverS = [];
    if (event.detail.value !== '') {
      this.http
        .post(
          `https://tmdb-for-a-angularmovile.onrender.com/movies/filter/genre`,
          {
            genre: `${event.detail.value}`,
          }
        )
        .subscribe({
          next: (data: any) => {
            this.coverM = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    }
  }

  bySeriesGenre(event: any) {
    this.coverM = [];
    this.coverS = [];
    if (event.detail.value !== '') {
      this.http
        .post(
          `https://tmdb-for-a-angularmovile.onrender.com/series/filter/genre`,
          {
            genre: `${event.detail.value}`,
          }
        )
        .subscribe({
          next: (data: any) => {
            this.coverS = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    }
  }

  byYear(startYear: number, endYear: number) {
    this.coverM = [];
    this.coverS = [];
    if (startYear !== 0 && endYear !== 0) {
      this.http
        .get(
          `https://tmdb-for-a-angularmovile.onrender.com/movies/filter/year/${startYear}/${endYear}`
        )
        .subscribe({
          next: (data: any) => {
            this.coverM = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      this.http
        .get(
          `https://tmdb-for-a-angularmovile.onrender.com/series/filter/year/${startYear}/${endYear}`
        )
        .subscribe({
          next: (data: any) => {
            this.coverS = data;
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    }
  }

  ngOnInit() {}
}
