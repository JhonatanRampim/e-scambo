import { Component, OnInit } from '@angular/core';
import { IMovel } from '../../shared/model/movel.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  moveis: IMovel[];

  constructor() { }

  ngOnInit() {
  }

}
