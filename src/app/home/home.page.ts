import { Component, OnInit } from '@angular/core';
import { IMovel } from '../shared/model/movel.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  moveis: IMovel[];

  constructor() { }

  ngOnInit() {
    this.moveis = [
      {
        id:1, 
        title:'Sofá cama Caster, pronta entrega', 
        description:'ACEITAMOS CARTÃO DE CRÉDITO E PARCELAMOS EM ATÉ 12x SEM JUROS ACEITAMOS PAGAMENTO VIA PICPAY NOVIDADE ACEITAMOS CARTÃO SENF EM ATÉ 3X SEM JUROS. OBS: VALORES SUJEITOS A ALTERAÇÃO A QUALQUER MOMENTO DEVIDO A DEMANDA DE FALTA DE MATERIA PRIMA', 
        createdAt:'2022-05-29 20:14', 
        updatedAt:'2022-05-29 20:14', 
        thumbnail: {id:1, path:'https://img.olx.com.br/images/83/832279274299273.jpg'}
      },
      {
        id:2, 
        title:'Móvel para Joias', 
        description:'São Carlos SP - Lindo móvel para joias com pintura rústica. Medidas: 76 cm altura x 52 cm largura x 31 cm profundidade. Passo cartão crédito e débito.', 
        createdAt:'2022-05-30 20:14', 
        updatedAt:'2022-05-30 20:14', 
        thumbnail: {id:1, path:'https://img.olx.com.br/images/35/355284289578959.jpg'}
      },
      {
        id:2, 
        title:'Móvel para Joias', 
        description:'São Carlos SP - Lindo móvel para joias com pintura rústica. Medidas: 76 cm altura x 52 cm largura x 31 cm profundidade. Passo cartão crédito e débito.', 
        createdAt:'2022-05-30 20:14', 
        updatedAt:'2022-05-30 20:14', 
        thumbnail: {id:1, path:'https://img.olx.com.br/images/35/355284289578959.jpg'}
      }
    ]
  }

}
