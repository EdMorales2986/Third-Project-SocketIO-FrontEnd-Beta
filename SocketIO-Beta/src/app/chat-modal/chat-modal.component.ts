import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit, AfterViewChecked {
  @Input() user!: string;
  @Input() participants!: string;
  @Input() roomId!: string;
  @ViewChild('chatScroll') chatScroll!: ElementRef;

  message: string = '';
  messages: any = [];
  private socket: any;

  constructor(
    public modalController: ModalController,
    private http: HttpClient,
    private router: Router
  ) {
    this.socket = io('http://localhost:4000', { autoConnect: false });
  }

  sendMessage() {
    const msg = {
      message: this.message,
      sender: this.user,
    };

    this.http
      .post('http://localhost:4000/chat/message', {
        message: msg,
        roomId: this.roomId,
      })
      .subscribe((data: any) => {
        this.socket.emit('message', {
          message: msg.message,
          sender: msg.sender,
          roomId: this.roomId,
        });
        this.message = '';
      });

    this.chatScroll.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
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

    this.http
      .get('http://localhost:4000/chat/messages/' + this.roomId)
      .subscribe((data: any) => {
        this.messages = data.messages;
        // console.log(this.messages);
      });

    this.socket.on('message', (data: any) => {
      console.log(data);
      this.messages.push(data);
    });
  }

  ngAfterViewChecked() {
    this.chatScroll.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
