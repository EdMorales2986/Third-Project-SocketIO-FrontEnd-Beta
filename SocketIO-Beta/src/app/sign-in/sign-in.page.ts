import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'jwt' });
    this.http
      .post('https://tmdb-for-a-angularmovile.onrender.com/jwt-verify', {
        token: `${value}`,
      })
      .subscribe({
        next: (state) => {
          console.log(state);
          this.router.navigate(['/home']);
        },
        error: async (state) => {
          console.log(state);
          await Preferences.remove({ key: 'jwt' });
          await Preferences.remove({ key: 'alias' });
          this.router.navigate(['sign-in']);
        },
      });
  }

  // BACK+FRONT
  onSubmit() {
    this.http
      .post(
        'https://tmdb-for-a-angularmovile.onrender.com/signin',
        {
          alias: this.username,
          password: this.password,
        },
        { observe: 'response' }
      )
      .subscribe({
        next: async (response) => {
          // console.log(response);
          const { jwt, user }: any = response.body;
          // console.log(jwt);

          await Preferences.set({ key: 'jwt', value: jwt });
          await Preferences.set({ key: 'alias', value: user.alias });
          this.router.navigate(['home']);
        },
        error: (error) => {
          const alert = this.alertController
            .create({
              header: 'ERROR',
              message: error.error.msg,
              buttons: ['Dismiss'],
            })
            .then((alert) => {
              alert.present();
            });
        },
      });
  }
}
