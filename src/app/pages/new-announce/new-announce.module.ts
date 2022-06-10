import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAnnouncePageRoutingModule } from './new-announce-routing.module';

import { NewAnnouncePage } from './new-announce.page';

import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MaterialFileInputModule,
    NewAnnouncePageRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [NewAnnouncePage],
})
export class NewAnnouncePageModule {}
