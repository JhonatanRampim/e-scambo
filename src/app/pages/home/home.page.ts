import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IMovel } from '../../shared/model/movel.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  moveis: IMovel[];

  constructor(
    public menuControler: MenuController
  ) { }

  ngOnInit() {
    this.menuControler.enable(true);
  }

}
