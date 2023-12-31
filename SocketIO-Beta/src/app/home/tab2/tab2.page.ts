import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  user: string = '';
  users: any = [];
  groups: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public modalController: ModalController
  ) {}

  searchUser(event: any) {
    this.users = [];
    if (event.target.value !== '') {
      this.http
        .post('https://tmdb-for-a-angularmovile.onrender.com/search', {
          query: `${event.target.value}`,
        })
        .subscribe((data: any) => {
          data.forEach((user: any) => {
            if (user.alias !== this.user) {
              this.users.push(user);
            }
          });
        });
    }
    console.log(this.users);
  }

  openChat(user: any) {
    this.http
      .post('https://tmdb-for-a-angularmovile.onrender.com/chat', {
        roomId: this.user + user.alias,
        participants: [this.user, user.alias],
      })
      .subscribe((data: any) => {
        // console.log(data);
        const modal = this.modalController
          .create({
            component: ChatModalComponent,
            componentProps: {
              user: this.user,
              participants: [this.user, user.alias],
              roomId: data.roomId,
            },
          })
          .then((modal) => {
            modal.present();
          });
      });
    // modal.then(modal => modal.present());
  }

  openGroup(group: any) {
    const modal = this.modalController
      .create({
        component: ChatModalComponent,
        componentProps: {
          user: this.user,
          participants: [],
          roomId: group.roomId,
        },
      })
      .then((modal) => {
        modal.present();
      });
  }

  async ngOnInit() {
    const data = await Preferences.get({ key: 'alias' });
    this.user = data.value!;

    this.http
      .get('https://tmdb-for-a-angularmovile.onrender.com/chat/public')
      .subscribe((data: any) => {
        console.log(data);
        this.groups = data;
      });
  }
}
