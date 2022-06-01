import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-announce',
  templateUrl: './new-announce.page.html',
  styleUrls: ['./new-announce.page.scss'],
})
export class NewAnnouncePage implements OnInit {
  novoMovelForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.novoMovelForm  = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      estado: [''],
      basicfile:['']
    })
  }

}
