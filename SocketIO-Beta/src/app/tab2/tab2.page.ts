import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  user: string = '';
  users: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public modalController: ModalController
  ) {}

  async searchUser(event: any) {
    this.users = [];
    if (event.target.value !== '') {
      await this.http
        .post('http://localhost:4000/search', {
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

  async openChat(user: any) {
    // const modal = this.modalController
    //   .create({
    //     component: ChatModalComponent,
    //     componentProps: {
    //       from: this.user,
    //       to: user,
    //       roomId: this.user + user.alias,
    //     },
    //   })
    //   .then((modal) => {
    //     modal.present();
    //   });
  }

  // modal.then(modal => modal.present());

  ngOnInit() {
    this.user = 'EdMo';
  }
}
