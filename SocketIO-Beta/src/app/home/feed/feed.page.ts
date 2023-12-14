import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
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

  async ngOnInit() {
    this.http.get('http://localhost:4000/movies').subscribe((data: any) => {
      this.coverM = data;
      // console.log(this.coverM[0].genres);
    });

    this.http.get('http://localhost:4000/series').subscribe((data: any) => {
      this.coverS = data;
    });

    const data = await Preferences.get({ key: 'alias' });
    this.user = data.value!;

    // console.log(data);
  }
}
