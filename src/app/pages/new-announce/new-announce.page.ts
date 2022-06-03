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
      nome: ['',[Validators.required]],
      descricao: ['',[Validators.required]],
      estado: ['',[Validators.required]],
      foto1:['', [Validators.required]],
      foto2:['', [Validators.required]],
      foto3:[''],
      foto4:[''],
    })
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.novoMovelForm.value);
  }

}
