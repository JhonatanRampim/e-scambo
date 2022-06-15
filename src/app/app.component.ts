import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any;
  constructor(public authService: AuthService, public router: Router, public menuController: MenuController) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user) {
        this.menuController.swipeGesture(true);
        return this.user = user;
      }
      this.menuController.swipeGesture(false);
    });
  }
  ionViewDidEnter(): void {
    if (!this.user) {
      this.menuController.swipeGesture(false);
    }
    this.menuController.swipeGesture(true);
  }

  logout() {
    this.authService.logout().subscribe(data => {
      if (data) {
        this.menuController.close();
        this.menuController.swipeGesture(false);
        return this.router.navigate(['/login']);
      }
    });

  }
}
