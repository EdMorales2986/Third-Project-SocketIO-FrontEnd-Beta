import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { CreateCommentsComponent } from '../create-comments/create-comments.component';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss'],
})
export class ViewCommentsComponent implements OnInit {
  @Input() origin: any;
  comments: any = [];

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async loadComments() {
    const { value } = await Preferences.get({ key: 'alias' });
    const id = this.origin;

    this.http
      .get(`http://localhost:4000/comments/${id}`)
      .subscribe((data: any) => {
        this.comments = data;
      });
  }

  async deleteComment(comment: any) {
    const { value } = await Preferences.get({ key: 'alias' });

    this.http
      .delete(`http://localhost:4000/comments/${value}/${comment._id}`)
      .subscribe((data: any) => {
        this.loadComments();
        // console.log(data);
      });
  }

  async addComment() {
    const { value } = await Preferences.get({ key: 'alias' });

    this.modalController
      .create({
        component: CreateCommentsComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          origin: this.origin,
        },
      })
      .then((modal) => {
        modal.onDidDismiss().then(() => this.loadComments());
        modal.present();
      });
  }

  viewComments(comment: any) {
    this.modalController
      .create({
        component: ViewCommentsComponent,
        componentProps: {
          origin: comment?._id,
        },
      })
      .then((modal) => {
        modal.onDidDismiss().then(() => this.loadComments());
        modal.present().then(() => {
          this.loadComments();
        });
      });
  }

  async ngOnInit() {
    console.log(this.origin);

    this.loadComments();
  }
}
