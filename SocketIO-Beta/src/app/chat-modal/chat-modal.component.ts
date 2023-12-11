import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit {
  @Input() from!: string;
  @Input() to!: string;
  @Input() roomId!: string;

  message: string = '';
  messages: any = [
    {
      message: 'hi',
      user: 'me',
    },
    {
      message: 'hello',
      user: 'you',
    },
  ];
  private socket: any;

  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router
  ) {
    this.socket = io('http://localhost:4000', { autoConnect: false });
  }

  sendMessage() {
    this.socket.emit('message', {
      message: this.message,
      user: this.from,
      roomId: this.roomId,
    });
    this.message = '';
  }

  closeModal() {
    this.socket.emit('leaveRoom', {
      roomId: this.roomId,
    });
    this.socket.disconnect();
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('joinRoom', {
      roomId: this.roomId,
    });

    // this.http
    //   .get('http://localhost:4000/chat/' + this.roomId)
    //   .subscribe((data) => {
    //     this.messages = data;
    //     console.log(data);
    //   });

    this.socket.on('message', (data: any) => {
      console.log(data);
      // this.messages.push(data);
    });
  }
}
